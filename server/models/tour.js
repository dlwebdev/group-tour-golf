// load mongoose since we need it to define a model
var mongoose = require('mongoose');

var Schema = mongoose.Schema;  

var tourSchema = new Schema({
  name: String,
  players: Array,
  standings: Array,
  tournaments: Array
});

module.exports = mongoose.model('Tour', tourSchema);