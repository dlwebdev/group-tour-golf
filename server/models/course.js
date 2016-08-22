// load mongoose since we need it to define a model
var mongoose = require('mongoose');

var Schema = mongoose.Schema;  

var courseSchema = new Schema({
  name: String,
  record: {
    score: String,
    userId: String,
    userName: String
  },
  tees: {
    teeLabel: String,
    totalDistance: Number,
    par: Number,
    holes: Array  
  },
  location: String
});

module.exports = mongoose.model('Course', courseSchema);