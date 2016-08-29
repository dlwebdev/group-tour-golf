// load mongoose since we need it to define a model
var mongoose = require('mongoose');

var Schema = mongoose.Schema;  

var roundSchema = new Schema({
  userId: String,
  userName: String,
  score: String,
  courseName: String,
  courseId: String,
  scoreToPar: String,
  frontNineScores: Array,
  backNineScores: Array,
  holes: Array,  
  date: String
});

module.exports = mongoose.model('Round', roundSchema);
