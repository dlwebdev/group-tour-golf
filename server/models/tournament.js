// load mongoose since we need it to define a model
var mongoose = require('mongoose');

var Schema = mongoose.Schema;  

var tournamentSchema = new Schema({
  date: String,
  coursePlayed: Object,
  winningUser: Object,
  numberPlayed: Number,
  participants: Array,
  results: Array
});

module.exports = mongoose.model('Tournament', tournamentSchema);