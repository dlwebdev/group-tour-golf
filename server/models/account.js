// load mongoose since we need it to define a model
var mongoose = require('mongoose');

var Schema = mongoose.Schema;  

var accountSchema = new Schema({
  id: String,
  username: String,
  handicap: Number,
  friends: Array,
  rounds: Array,
  currentRound: Object,
  lastLogin: String
});

module.exports = mongoose.model('Account', accountSchema);