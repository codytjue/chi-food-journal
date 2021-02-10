var Day = require("./schemas.js")

exports.addMeal = (req, res) => {
  let date = new Date();
  let dateFormat = date.toISOString().slice(0, 10);

  let currentMeal = req.body

  console.log("current meal:", currentMeal)

  Day.findOneAndUpdate({date: dateFormat}, {$push: {meals: currentMeal}, $inc: {
    'totals.calories': currentMeal.totals.calories,
    'totals.carbs': currentMeal.totals.carbs,
    'totals.fat': currentMeal.totals.fat,
    'totals.protein': currentMeal.totals.protein
  }}, {upsert: true})
  .then(() => res.status(200).send('New meal submitted'))
  .catch((err) => console.log('Error:', err))
}

exports.findMealsByDay = (req, res) => {
  let date = new Date();
  date.setHours(date.getHours()-5);
  let dateFormat = date.toISOString().slice(0, 10);

  console.log("req", req)

  Day.findOne({date: dateFormat})
  .then((result) => {res.status(200).send(result)})
}