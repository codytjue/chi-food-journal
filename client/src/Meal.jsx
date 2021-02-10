import React from "react";

const Meal = ({ meal }) => {

  return (
    <div className="mealDiv">
      {meal.name}
    </div>
  )


};

export default Meal;