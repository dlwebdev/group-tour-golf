var express = require('express');
var router = express.Router();

var Account = require('../server/models/account');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json({
    name: "John",
    last: "Smith"
  });
});

router.get('/authenticated', function(req, res, next) {
  var authed = false;
  if (req.isAuthenticated()) {
    authed = true;
  }
  res.json({'authenticated': authed});
});    
    
router.get('/current-user', function(req, res, next) {
  if (req.isAuthenticated()) {
    res.json({'user': req.user});
  } else {
    res.json({'userId': '-1'});
  }
}); 

router.get('/friends', function(req, res) {
  if(req.isAuthenticated()) {
    var userId = req.user.twitter.id;

    console.log('Looking for polls with a creator id of: ', userId);

    Account.find({'id': userId}, function (err, account) {
      if(err) console.log('Err: ', err);
      res.json(account);
    });
  } else {
    res.json({});
  }
});

module.exports = router;
