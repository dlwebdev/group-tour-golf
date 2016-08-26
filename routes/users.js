var express = require('express');
var router = express.Router();

var Account = require('../server/models/account');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json({
    name: "Fuck",
    last: "Off"
  });
});

router.get('/authenticated', function(req, res, next) {
  var authed = false;
  
  if (req.isAuthenticated()) {
    authed = true;
  }
  res.json({'authenticated': authed});
});  

router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});
    
router.get('/current-user', function(req, res, next) {
  if (req.isAuthenticated()) {
    Account.find({'id': req.user.twitter.id}, function (err, account) {
      if(err) console.log('Err: ', err);
      res.json(account[0]);
    });    
  } 
  else {
    res.json({'user': ''});
  }
}); 


// Returns all the rounds for friends passed in via array of ids
router.put('/friends-detailed', function(req, res) {
    var friends = req.body;
       
    Account.find({ id: { $in: friends } }, function (err, accounts) {
        if(err) console.log('Err: ', err);
        res.json(accounts);
    });       
       
});

router.get('/friends', function(req, res) {
  if(req.isAuthenticated()) {
    Account.find({'id': req.user.twitter.id}, function (err, userAccount) {
      if(err) console.log('Err: ', err);
      res.json(userAccount[0]);
    });
  } 
  else {
    res.json({});
  }
});

module.exports = router;
