import React, { useState } from "react";
import axios from "axios";

const AddMealForm = () => {
  const [currentFoods, setFoods] = useState([]);

  let handleSubmit = (event) => {
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
            carbs: result.data.foods[0].nf_carbohydrate,
            fat: result.data.foods[0].nf_total_fat,
            protein: result.data.foods[0].nf_protein,
          },
        ]);
      });
  };

  return (
    <div id="addmeal">
      <span id="addMealTitle">Add a Meal </span><span id="addMealPlus">+</span>
      <form>
        <input type="text" id="search"></input>
        <input type="submit" onClick={handleSubmit}></input>
      </form>
      {currentFoods.map((food) => {
        return <div className="mealwip">
           <span>{food.qty} {food.unit} {food.food}</span><br/>
          <span>Calories: {food.calories}</span><br/>
          <span>Carbohydrates: {food.carbs}</span><br/>
          <span>Fat: {food.fat}</span><br/>
          <span>Protein: {food.protein}</span><br/>
          </div>;
      })}
    </div>
  );
};

export default AddMealButton;
