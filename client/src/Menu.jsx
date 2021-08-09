import React, { useState } from "react";
import axios from "axios";

const Menu = ({ handleNewMeal, handleDateChange }) => {
  const [currentFoods, setFoods] = useState([]);

  const [menuStatus, setStatus] = useState('menu');

  const [currentGoals, setGoals] = useState({});

  const [dailyTotals, setTotals] = useState({calories: 0, carbs: 0, fat: 0, protein: 0});

  let handleAddMeal = () => {
    setStatus('meal');
  };

  let handleAddFood = (event) => {
    event.preventDefault();
    var search = document.getElementById("search");

      axios.get('/nutrition', { params: {search: search.value}})
      .then((result) => {
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

  let handleDailyGoalsButton = () => {
    setStatus('goals');
    axios.get('/meals')
    .then((result) => {console.log("TESTING:", result.data); if (result.data.totals !== undefined) {setTotals(result.data.totals)}});
    axios.get('/goals')
    .then((result) => {setGoals(result.data)})
  }

  let goalProgress = []


  for (var key in currentGoals) {
    if (currentGoals[key] !== 0 && key !== '_id' && key !== 'user') {
      let percentage = (dailyTotals[key]/currentGoals[key]) * 300;
      let goalExceeded = '';
      if (percentage > 300) {
        percentage = 300;
        goalExceeded = <div><span className="goalExceeded">Goal Exceeded!</span><br/></div>
      };
      goalProgress.push(<div><span className="goalMacro">{key.charAt(0).toUpperCase() + key.slice(1)}</span><div className="progressBar"><div className="progress" style={{width: percentage + "px"}}></div></div><span className="goalProgressStats">{dailyTotals[key]} / {currentGoals[key]}</span><br/>{goalExceeded}<br/></div>)
    }
  }

  if (goalProgress.length === 0) {
    goalProgress.push(<span id="noGoals">No current goals</span>)
  }

  let handleSettingsButton = () => {
    setStatus("settings")
  }

  let handleSchemeBerry = () => {
    var theme = document.getElementsByTagName('link')[0];

    theme.setAttribute('href', './berry.css');
  }

  let handleSchemeCarrot = () => {
    var theme = document.getElementsByTagName('link')[0];

    theme.setAttribute('href', './styles.css');
  }

  let handleSchemeGray = () => {
    var theme = document.getElementsByTagName('link')[0];

    theme.setAttribute('href', './bw.css');
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
        <button id="dailyGoalsButton" onClick={handleDailyGoalsButton}>
          Daily Goal Progress
        </button>
        <br/><br/>
        <button id="manageGoalsButton" onClick={handleManageGoalsButton}>
          Manage Goals
        </button>
        <br/><br/>
        <button id="manageSettingsButton" onClick={handleSettingsButton}>
          Settings
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
        </select><br/>
        <span className="subtext">To remove goal, enter value of 0</span>
        </div>
        <br/><br/>
        <button onClick={handleAddGoal}>Submit</button><br/>
        <button id="backButton" onClick={handleBack}>Back</button>
        </div>
      </div>
    );
  } else if (menuStatus === 'goals') {
    return (
      <div id="menu">
        <span id="goalProgressTitle">Daily Goal Progress</span><br/><br/>
        {goalProgress}
        <br/><br/>
        <button id="backButton" onClick={handleBack}>Back</button>
      </div>
    );
  } else if (menuStatus === 'settings') {
    return (
      <div id="menu">
        <span id="goalProgressTitle">Select Color Palette:</span><br/><br/>
        <div className="colorOptionCarrot" onClick={handleSchemeCarrot}>
        <span>Carrot</span><br/><span id="carrot1"></span><span id="carrot2"></span><br/>
        </div>
        <br/>
        <div className="colorOptionBerry" onClick={handleSchemeBerry}>
        <span>Berry</span><br/><span id="berry1"></span><span id="berry2"></span><br/>
        </div>
        <br/>
        <div className="colorOptionGray" onClick={handleSchemeGray}>
        <span>Grayscale</span><br/><span id="gray1"></span><span id="gray2"></span><br/>
        </div>
        <br/><br/>
        <button id="backButton" onClick={handleBack}>Back</button>
      </div>
    );
  }
};

export default Menu;
