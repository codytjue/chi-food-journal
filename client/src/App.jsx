
import React from "react";
import MealList from "./MealList.jsx";
import AddMealButton from "./AddMealButton.jsx";
import axios from "axios";

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {todaysMeals: {}};
  }

  componentDidMount() {

    axios.get('/meals')
    .then((res) => {console.log("get results:", res) ;this.setState({todaysMeals: res.data})})
  }

  render() {
    const { name } = this.props;
    return (
      <div id="container">
        <div id="header">
        <h1>
        chī
        </h1>

        </div>
        <div id="body">
        <AddMealButton/>
        <MealList todaysMeals={this.state.todaysMeals}/>
        </div>
      </div>
    );
  }
}

export default App;