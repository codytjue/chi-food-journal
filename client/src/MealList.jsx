import React from "react";
import Meal from "./Meal.jsx"

const MealList = ({ todaysMeals }) => {

  let meals = todaysMeals.meals || []
  let totals = todaysMeals.totals

  console.log("mealies:", todaysMeals)

  let toFixedDecimal =(value) =>{
    return +parseFloat(value).toFixed(2);
  }

  let totalsTable;
  if (totals) {
    totalsTable = <div><span>Totals</span><table id="totalsTable">
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
        <td>{toFixedDecimal(todaysMeals.totals.calories)}</td>
        <td>{toFixedDecimal(todaysMeals.totals.carbs)}</td>
        <td>{toFixedDecimal(todaysMeals.totals.fat)}</td>
        <td>{toFixedDecimal(todaysMeals.totals.protein)}</td>
      </tr>
      </tbody>
    </table>
    </div>
  }

  return (
    <div id="dayTitle">
      <span id="ydsf">Your Day So Far : </span><br/><br/>
      {totalsTable}
      <br/>
      {meals.map((meal, index) => {
        return (<Meal meal={meal} key={index}/>)
      })}
    </div>
  )


};

export default MealList;
