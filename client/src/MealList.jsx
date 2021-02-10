import React from "react";
import Meal from "./Meal.jsx"

const MealList = ({ todaysMeals }) => {

  let meals = todaysMeals.meals || []
  let totals = todaysMeals.totals
  let mealsDate;
  let mealsDateFormat;

  if (todaysMeals.date) {
    mealsDate = todaysMeals.date.slice(0, 10);
    let d = new Date(mealsDate);
    d.setHours(d.getHours()+5);
    mealsDateFormat = d.toDateString()
  }

  let todaysDate = new Date()
  let todaysDateFormat = todaysDate.toISOString().slice(0, 10);

  let toFixedDecimal = (value) =>{
    return +parseFloat(value).toFixed(2);
  }

  let mealListTitle;
  if (mealsDate === todaysDateFormat) {
    mealListTitle = <span id="ydsf">Your Day So Far : </span>
  } else {
    mealListTitle = <span id="ydsf">Your Day On: {mealsDateFormat} </span>
  }

  let totalsTable;
  if (totals) {
    totalsTable = <div><span id="totalsTitle">Totals</span><table id="totalsTable">
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
      {mealListTitle}
      <br/><br/>
      {totalsTable}
      <br/>
      {meals.map((meal, index) => {
        return (<Meal meal={meal} key={index}/>)
      })}
    </div>
  )


};

export default MealList;
