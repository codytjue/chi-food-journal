
import React from "react";
import MealList from "./MealList.jsx";
import Menu from "./Menu.jsx";
import axios from "axios";

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {todaysMeals: {}};
  }

  componentDidMount() {

    axios.get('/meals')
    .then((res) => {this.setState({todaysMeals: res.data})})
  }

  handleNewMeal () {
    axios.get('/meals')
    .then((res) => {this.setState({todaysMeals: res.data})})
  }

  handleDateChange () {
    var selectedDate = document.getElementById("dateSelector").value;

    let params = {date: selectedDate}

    axios.get('/meals/date', { params })
    .then((res) => {this.setState({todaysMeals: res.data})})

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
        <Menu handleNewMeal={this.handleNewMeal.bind(this)} handleDateChange={this.handleDateChange.bind(this)}/>
        <MealList todaysMeals={this.state.todaysMeals}/>
        </div>
      </div>
    );
  }
}

export default App;