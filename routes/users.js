var express = require('express');
var router = express.Router();
var async = require('async');

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
      
      console.log("Account friends: ", account.friends);
      
      
      async.forEachLimit(account.friends, 5, function(friendAccount, callback) {
        var friendId = friendAccount;
        var currentFriend;
        
        console.log("Adding friend: ", friendAccount);
        
        Account.find({id: friendId}, function (err, acct) {
          if(err) console.log('Err: ', err);
          console.log("Account found: ", acct);
          currentFriend = acct[0];
        }).then(function() {      
          console.log("Pushing this friend: ", currentFriend);
          updatedAccount.friendsWithDetails.push(currentFriend);
          console.log("updated account after pushing: ", updatedAccount);
          callback();
        });
        
        if(friendsProcessed === account.friends) {
          // All friends processed. Send back results immediately.
          console.log("All friends processed 1. returning this: ", updatedAccount);
          res.json(updatedAccount);
        }
        friendsProcessed++;
      }, 
      function(err) {
        if (err) console.log(err);
        console.log("ERR friends processed 2. returning this: ", updatedAccount);
        res.json(updatedAccount);
      });      
      
    });
  } else {
    res.json({});
  }
});

module.exports = router;
