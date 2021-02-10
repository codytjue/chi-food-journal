import React, { useState } from "react";
import axios from "axios";

const Menu = ({ handleNewMeal, handleDateChange }) => {
  const [currentFoods, setFoods] = useState([]);

  const [menuStatus, setStatus] = useState('menu');

  const [currentGoals, setGoals] = useState({})

  let handleAddMeal = () => {
    setStatus('meal');
  };

  let handleAddFood = (event) => {
    event.preventDefault();
    var search = document.getElementById("search");
    console.log(search.value);
    axios
      .post(
        "https://trackapi.nutritionix.com/v2/natural/nutrients",
        { query: search.value },
        {
          headers: {
            "x-app-id": "ec57e159",
            "x-app-key": "835fab70b7506103c340e1e66ba3079c",
            "x-remote-user-id": 0,
          },
        }
      )
      .then((result) => {
        console.log("result:", result.data.foods[0]);
        setFoods([
          ...currentFoods,
          {
            food: result.data.foods[0].food_name,
            qty: result.data.foods[0].serving_qty,
            unit: result.data.foods[0].serving_unit,
            calories: result.data.foods[0].nf_calories,
            carbs: result.data.foods[0].nf_total_carbohydrate,
            fat: result.data.foods[0].nf_total_fat,
            protein: result.data.foods[0].nf_protein,
          },
        ]);
      })
      .then(() => {
        document.getElementById("search").value = "";
      });
  };

  let handleRemoveFood = (e) => {
    let index = e.target.parentElement.id;
    let foodList = JSON.parse(JSON.stringify(currentFoods));

    foodList.splice(index, 1);

    setFoods(foodList);
  };

  let handleSubmitMeal = (e) => {
    e.preventDefault();
    let name = document.getElementById("mealNameInput").value;
    if (name.length === 0) {
      alert("Please enter valid meal name");
      return;
    }
    let foods = currentFoods;
    if (foods.length === 0) {
      alert("Please add at least one food item");
      return;
    }

    let totals = {
      calories: 0,
      carbs: 0,
      fat: 0,
      protein: 0,
    };

    for (let i = 0; i < foods.length; i++) {
      totals.calories += foods[i].calories;
      totals.carbs += foods[i].carbs;
      totals.fat += foods[i].fat;
      totals.protein += foods[i].protein;
    }

    let meal = { name, foods, totals };

    axios
      .post("/meals", meal)
      .then((res) => {
        console.log("Post response:", res);
      })
      .then(() => {
        setFoods([]);
        setStatus('menu');
        handleNewMeal();
      });
  };

  let handleBack = () => {
    setStatus('menu')
  }

  let handleBackDate = () => {
    handleNewMeal();
    setStatus('menu');
  }

  let handleDateButton = () => {
    setStatus('date')
  }

  let handleDateSubmit = () => {
    var selectedDate = document.getElementById("dateSelector").value;

    let params = {date: selectedDate}
  }

  let handleManageGoalsButton = () => {
    setStatus('manage');
    axios.get('/goals')
    .then((result) => {setGoals(result.data)})
  }

  let currentGoalsDisplay = 'none';
  let currentCal = "none";
  let currentCar = "none";
  let currentFat = "none";
  let currentPro = "none";

  console.log("currentGoals:", currentGoals)
    if (currentGoals.calories !== 0) {
      currentCal = currentGoals.calories
    }
    if (currentGoals.carbs !== 0) {
      currentCar = currentGoals.carbs
    }
    if (currentGoals.fat !== 0) {
      currentFat = currentGoals.fat
    }
    if (currentGoals.protein !== 0) {
      currentPro = currentGoals.protein
    }

    currentGoalsDisplay = <div id="currentGoalsDisplay">
      <span className="currentGoalsMacro">Calories: </span><span className="currentGoalsAmt">{currentCal}</span><br/>
      <span className="currentGoalsMacro">Carbs: </span><span className="currentGoalsAmt">{currentCar}</span><br/>
      <span className="currentGoalsMacro">Fat: </span><span className="currentGoalsAmt">{currentFat}</span><br/>
      <span className="currentGoalsMacro">Protein: </span><span className="currentGoalsAmt">{currentPro}</span>
    </div>

  let handleAddGoal = () => {
    let amount = document.getElementById("goalText").value;
    let macro = document.getElementById("macroSelection").value;
    let amountNum = parseInt(amount, 10)

    let request = {};
    request[macro] = amountNum;

    axios.post('/goals', request)
    .then((result) => {setGoals(result.data)})
  }

  let toFixedDecimal =(value) =>{
    return +parseFloat(value).toFixed(2);
  }

  if (menuStatus === 'menu') {
    return (
      <div id="menu">
        <button id="addMealButton" onClick={handleAddMeal}>
          Add a Meal
        </button>
        <br/><br/>
        <button id="changeDateButton" onClick={handleDateButton}>
          Change Date
        </button>
        <br/><br/>
        <button id="manageGoalsButton" onClick={handleManageGoalsButton}>
          Manage Goals
        </button>
      </div>
    );
  } else if (menuStatus === 'meal') {
    return (
      <div id="menu">
        <input id="mealNameInput" placeholder="Meal Name"></input>
        <br />
        <br />
        {currentFoods.map((food, index) => {
          return (
            <div className="mealwip" key={index} id={index}>
              <div className="foodDiv">
                <span className="foodTitle">
                  {food.qty} {food.unit} {food.food}
                </span>
                <table className="foodTables">
                  <thead>
                    <tr className="testTitles">
                      <td>Calories</td>
                      <td>Carbs</td>
                      <td>Fat</td>
                      <td>Protein</td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{toFixedDecimal(food.calories)}</td>
                      <td>{toFixedDecimal(food.carbs)}</td>
                      <td>{toFixedDecimal(food.fat)}</td>
                      <td>{toFixedDecimal(food.protein)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <span className="removeFoodItem" onClick={handleRemoveFood}>
                Remove item
              </span>
              <br />
              <br />
            </div>
          );
        })}
        <form>
          <input type="text" id="search"></input>
          <input
            id="foodSubmit"
            type="button"
            value="+"
            onClick={handleAddFood}
          ></input>
          <br />
          <br />
          <input
            type="submit"
            value="Finish Meal"
            onClick={handleSubmitMeal}
          ></input>
        </form>
        <button id="backButton" onClick={handleBack}>Back</button>
      </div>
    );
  } else if (menuStatus === 'date') {
    return (
      <div id="menu">
        <input type="date" id="dateSelector"></input><br/><br/>
        <button onClick={handleDateChange}>Submit</button><br/>
        <button id="backButton" onClick={handleBackDate}>Back</button>
      </div>
    );
  } else if (menuStatus === 'manage') {
    return (
      <div id="menu">
        <div id="addGoalsPage">
        <span>Current Goals:</span><br/><br/>
          {currentGoalsDisplay}
          <br/><br/>
        <span>Add/Edit Goal:</span><br/><br/>
        <div id="goalSelector">
        <input type="text" id="goalText"></input>
        <select id="macroSelection">
          <option value="calories">Calories</option>
          <option value="carbs">Carbs</option>
          <option value="fat">Fat</option>
          <option value="protein">Protein</option>
        </select>
        </div>
        <br/><br/>
        <button onClick={handleAddGoal}>Submit</button><br/>
        <button id="backButton" onClick={handleBack}>Back</button>
        </div>
      </div>
    );
  }
};

export default Menu;
