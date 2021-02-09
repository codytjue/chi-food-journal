
import React from "react";
import MealList from "./MealList.jsx";
import AddMealButton from "./AddMealButton.jsx";

class App extends React.Component {
  render() {
    const { name } = this.props;
    return (
      <div id="container">
        <div id="header">
        <h1>
          Food Diary
        </h1>
        </div>
        <div id="body">
        <AddMealButton/>
        <MealList/>
        </div>
      </div>
    );
  }
}

export default App;