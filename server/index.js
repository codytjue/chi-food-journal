const express = require('express');
const app = express();
const port = 3434;
const controller = require('../database/controller.js');
const bodyParser = require('body-parser');
const { appId, appKey } = require('../config.js')
const axios = require('axios')

app.use(express.static(__dirname + "/../client/dist"));
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello :)')
})

app.get('/meals', controller.findMealsToday)

app.get('/meals/date', controller.findMealsByDate)

app.get('/goals', controller.findGoal)

app.post('/meals', controller.addMeal)

app.post('/goals', controller.addGoal)

app.get('/nutrition', controller.getNutritionInfo)

app.listen(port, ()=> {
  console.log(`MVP is listening at http://localhost:${port}`)
})