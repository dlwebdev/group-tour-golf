var express = require('express');
var router = express.Router();
var async = require('async');

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
    var userId = req.user.twitter.id;
    
    Account.find({'id': userId}, function (err, account) {
      if(err) console.log('Err: ', err);
      res.json(account[0]);
    });    
  } else {
    res.json({'user': ''});
  }
}); 

router.get('/friends', function(req, res) {
  if(req.isAuthenticated()) {
    var userId = req.user.twitter.id;
    
    var updatedAccount= {};

    Account.find({'id': userId}, function (err, userAccount) {
      if(err) console.log('Err: ', err);
      
      var account = userAccount[0];
      
      updatedAccount.id = account.id;
      updatedAccount.username = account.username;
      updatedAccount.handicap = account.handicap;
      updatedAccount.friends = account.friends;
      updatedAccount.friendsWithDetails = [];
      
      var friendsProcessed = 1;
      
      // for each friend id, get that account and push onto friendsWithDetails so 
      //   we always have most up to date info on them regarding handicap, etc.
      
      async.forEachLimit(account.friends, 5, function(friendAccount, callback) {
        var friendId = friendAccount;
        var currentFriend;
        
        Account.find({id: friendId}, function (err, acct) {
          if(err) console.log('Err: ', err);
          currentFriend = acct;
        }).then(function() {      
          updatedAccount.friendsWithDetails.push(currentFriend);
          callback();
        });
        
        if(friendsProcessed === account.friends) {
          // All friends processed. Send back results immediately.
          res.json(updatedAccount);
        }
        friendsProcessed++;
      }, 
      function(err) {
        if (err) console.log(err);
        res.json(updatedAccount);
      });      
      
    });
  } else {
    res.json({});
  }
});

module.exports = router;
