var db = require("./index.js");

var mongoose = require("mongoose");

var foodSchema = new mongoose.Schema({
  food: String,
  qty: Number,
  unit: String,
  calories: Number,
  carbs: Number,
  fat: Number,
  protein: Number
})

var mealSchema = new mongoose.Schema({
  name: String,
  foods: [foodSchema],
  totals: {calories: Number, carbs: Number, fat: Number, protein: Number}
})

var daySchema = new mongoose.Schema({
  date: {type: Date, unique: true},
  meals: [mealSchema],
  totals: {calories: {type: Number, default: 0}, carbs: {type: Number, default: 0}, fat: {type: Number, default: 0}, protein: {type: Number, default: 0}}

})

var goalSchema = new mongoose.Schema({
  user: {type: Number, unique: true}
})

var Day = mongoose.model('Day', daySchema, 'days');

module.exports = Day;