const express = require('express');
const app = express();
const port = 3434;
const controller = require('../database/controller.js');
const bodyParser = require('body-parser');

app.use(express.static(__dirname + "/../client/dist"));
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello :)')
})

app.get('/meals', controller.findMealsByDay)

app.post('/meals', controller.addMeal)

app.listen(port, ()=> {
  console.log(`MVP is listening at http://localhost:${port}`)
})