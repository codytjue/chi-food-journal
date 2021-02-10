import React, { useState } from "react";
import axios from "axios";

const AddMealButton = () => {

  const [currentFoods, setFoods] = useState([]);

  const [addingMeal, setAddStatus] = useState(false)

  let handleAddMeal = () => {
    setAddStatus(true)
  }

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
      .then(()=>{document.getElementById("search").value = ""});
  };

  let handleRemoveFood = (e) => {
    let index = e.target.parentElement.id
    let foodList = JSON.parse(JSON.stringify(currentFoods))

    foodList.splice(index, 1)

    setFoods(foodList);

  }

  let handleSubmitMeal = (e) => {
    e.preventDefault();
    let name = document.getElementById("mealNameInput").value
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
      protein: 0
    }

    for (let i = 0; i < foods.length; i++) {
      totals.calories += foods[i].calories;
      totals.carbs += foods[i].carbs;
      totals.fat += foods[i].fat;
      totals.protein += foods[i].protein;
    }

    let meal = { name, foods, totals }

    axios.post("/meals", meal)
    .then((res) => {console.log("Post response:", res)})
  }

  if (!addingMeal) {
    return (
      <div id="addmeal">
      <span id="addMealTitle" onClick={handleAddMeal}>Add a Meal </span><span id="addMealPlus">+</span>
      </div>
    )
  } else {
    return (
      <div id="addmeal">
        <input id="mealNameInput" placeholder="Meal Name"></input>
        <br/><br/>
        {currentFoods.map((food, index) => {
          return <div className="mealwip" key={index} id={index}>
             <span>{food.qty} {food.unit} {food.food}</span><br/>
            <span>Calories: {food.calories}</span><br/>
            <span>Carbohydrates: {food.carbs} g</span><br/>
            <span>Fat: {food.fat} g</span><br/>
            <span>Protein: {food.protein} g</span><br/>
            <span className="removeFoodItem" onClick={handleRemoveFood}>Remove item</span>
            <br/><br/>
            </div>;
        })}
        <form>
          <input type="text" id="search"></input>
          <input id="foodSubmit" type="button" value="+" onClick={handleAddFood}></input><br/><br/>
          <input type="submit" value="Finish Meal" onClick={handleSubmitMeal}></input>
        </form>
      </div>
    );
  }


};

export default AddMealButton;
