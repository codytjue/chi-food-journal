
import React from "react";
import MealList from "./MealList.jsx";
import AddMeal from "./AddMeal.jsx";

class App extends React.Component {
  render() {
    const { name } = this.props;
    return (
      <div>
        <h1>
          Food Diary
        </h1>
        <AddMeal/>
        <MealList/>
      </div>
    );
  }
}

export default App;