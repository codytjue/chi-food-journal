import React, { useState } from "react";
import axios from "axios";

const AddMeal = () => {

  const [currentFoods, setFoods] = useState([])

  let handleSubmit = (event) => {
    event.preventDefault();
    var search = document.getElementById("search")
    console.log(search.value)
    axios.post("https://trackapi.nutritionix.com/v2/natural/nutrients", {"query": search.value}, {
      headers: {
       "x-app-id": "ec57e159",
       "x-app-key": "835fab70b7506103c340e1e66ba3079c",
       "x-remote-user-id": 0
      }
    })
    .then((result) => {console.log("result:", result); setFoods([...currentFoods, {calories: result.data.foods[0].nf_calories}])})
  }

  return (
    <div>
      Add a Meal +
      <form>
        <input type="text" id="search"></input>
        <input type="submit" onClick={handleSubmit}></input>
      </form>
     {currentFoods.map((food) => {return (<p>Calories: {food.calories}</p>)})}
    </div>
  )


};

export default AddMeal;
