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
  holes: Array,
  location: String
});

module.exports = mongoose.model('Course', courseSchema);