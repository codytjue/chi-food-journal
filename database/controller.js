var schemas = require("./schemas.js")
var axios = require("axios")

exports.addMeal = (req, res) => {
  let date = new Date();
  date.setHours(date.getHours()-5);
  let dateFormat = date.toISOString().slice(0, 10);

  let currentMeal = req.body

  console.log("current meal:", currentMeal)

  schemas.Day.findOneAndUpdate({date: dateFormat}, {$push: {meals: currentMeal}, $inc: {
    'totals.calories': currentMeal.totals.calories,
    'totals.carbs': currentMeal.totals.carbs,
    'totals.fat': currentMeal.totals.fat,
    'totals.protein': currentMeal.totals.protein
  }}, {upsert: true})
  .then(() => res.status(200).send('New meal submitted'))
  .catch((err) => console.log('Error:', err))
}

exports.findMealsToday = (req, res) => {
  let date = new Date();
  date.setHours(date.getHours()-5);
  let dateFormat = date.toISOString().slice(0, 10);


  schemas.Day.findOne({date: dateFormat})
  .then((result) => {res.status(200).send(result)})
}

exports.findMealsByDate = (req, res) => {
  dateFormat = req.query.date;



  schemas.Day.findOne({date: dateFormat})
  .then((result) => {res.status(200).send(result)})
}

exports.addGoal = (req, res) => {


  schemas.Goal.findOneAndUpdate({user: 1}, req.body ,{upsert: true, new: true})
  .then((result) => {res.send(result)})
}

exports.findGoal = (req, res) => {

  schemas.Goal.findOne({user: 1})
  .then((result) => {res.status(200).send(result)})
}

