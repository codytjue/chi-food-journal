import React, { useState } from "react";

const Meal = ({ meal }) => {

  const [seeDetails, setDetails] = useState("See Details")

  let handleDetails = () => {
    if (seeDetails === "See Details") {
      setDetails("Hide Details")
    } else if (seeDetails === "Hide Details") {
      setDetails("See Details")
    }
  }

  let toFixedDecimal =(value) =>{
    return +parseFloat(value).toFixed(2);
  }

  let details;
  if (seeDetails === "See Details") {
    details = <div className="mealDetailsHidden">{meal.foods.map((food) => {
      return (
      <div className="foodDiv">
      <span className="foodTitle">{food.qty} {food.unit} {food.food}</span>
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
    </div>)
    })}</div>
  } else {
    details = <div className="mealDetails">{meal.foods.map((food) => {
      return (
      <div className="foodDiv">
      <span className="foodTitle">{food.qty} {food.unit} {food.food}</span>
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
    </div>)
    })}</div>
  }

  return (
    <div className="mealDiv">
      <span className="mealTitle">{meal.name}</span>
      <table className="mealTables">
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
        <td>{toFixedDecimal(meal.totals.calories)}</td>
        <td>{toFixedDecimal(meal.totals.carbs)}</td>
        <td>{toFixedDecimal(meal.totals.fat)}</td>
        <td>{toFixedDecimal(meal.totals.protein)}</td>
      </tr>
      </tbody>
    </table>
    {details}
    <span className="seehide" onClick={handleDetails}>{seeDetails}</span>
    </div>
  )


};

export default Meal;