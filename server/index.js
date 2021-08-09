const express = require('express');
const app = express();
const port = process.env.PORT || 3434;
const controller = require('../database/controller.js');
const bodyParser = require('body-parser');
//const { appId, appKey } = require('../config.js')
const axios = require('axios')
const apiId = process.env.API_ID || appId;
const apiKey = process.env.API_KEY || appKey;

app.use(express.static(__dirname + "/../client/dist"));
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

app.get('/meals', controller.findMealsToday)

app.get('/meals/date', controller.findMealsByDate)

app.get('/goals', controller.findGoal)

app.post('/meals', controller.addMeal)

app.post('/goals', controller.addGoal)

app.get('/nutrition', (req, res) => {
  let search = req.query.search
  let searchObject = {query: search}
  axios.post(
        "https://trackapi.nutritionix.com/v2/natural/nutrients",
        searchObject,
        {
          headers: {
            "x-app-id": apiId,
            "x-app-key": apiKey,
            "x-remote-user-id": 0,
          },
        }
      )
      .then((result) => {res.send(result.data)})
      .catch((err) => {console.error(err)})
})

app.listen(port, ()=> {
  console.log(`MVP is listening at http://localhost:${port}`)
})