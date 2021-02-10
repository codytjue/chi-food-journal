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

  let details;
  if (seeDetails === "See Details") {
    details = '';
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
        <td>{food.calories}</td>
        <td>{food.carbs}</td>
        <td>{food.fat}</td>
        <td>{food.protein}</td>
      </tr>
      </tbody>
    </table>
    </div>)
    })}</div>
  }

  return (
    <div className="mealDiv">
      {meal.name}
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
        <td>{meal.totals.calories}</td>
        <td>{meal.totals.carbs}</td>
        <td>{meal.totals.fat}</td>
        <td>{meal.totals.protein}</td>
      </tr>
      </tbody>
    </table>
    {details}
    <span className="seehide" onClick={handleDetails}>{seeDetails}</span>
    </div>
  )


};

export default Meal;