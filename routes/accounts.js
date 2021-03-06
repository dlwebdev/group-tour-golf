var express = require('express');
var router = express.Router();
var moment = require('moment');

var Account = require('../server/models/account');
var Round = require('../server/models/round');

/* GET accounts listing. */

router.get('/', function(req, res) {
    Account.find({}, function (err, accounts) {
        if(err) console.log('Err: ', err);
        res.json(accounts);
    }); 
});

router.get('/exclude/:id', function(req, res) {
    var id = req.params.id;
    Account.find({'id': {'$ne': id}}, function (err, accounts) {
        if(err) console.log('Err: ', err);
        res.json(accounts);
    }); 
});

router.get('/:userId/friends', function(req, res, next) {
    var id = req.params.userId;
    Account.findOne({'id':id},function(err, result) {
        if(err) console.log('Err: ', err);
        return res.send(result.friends);
    });
});

router.get('/:userId/addFriend/:friendId', function(req, res, next) {
    var userId = req.params.userId;
    var friendId = req.params.friendId;
    
    Account.findOne({'id':userId},function(err, result) {
        if(err) console.log('Err: ', err);
        
        var existingAccount = result;
        result.friends.push(friendId);
        
        Account.update({id: userId}, existingAccount, {upsert: true}, function (err, updatedAccount) {
            if(err) console.log('Err: ', err);
            return res.send(updatedAccount);
        });        
        
    });
});

router.get('/:userId/removeFriend/:friendId', function(req, res, next) {
    var userId = req.params.userId;
    var friendId = req.params.friendId;
    
    Account.findOne({'id':userId},function(err, result) {
        if(err) console.log('Err: ', err);
        
        var existingAccount = result;
        //console.log("Existing account for removing friend: ", existingAccount);
        
        for(var i = 0; i < existingAccount.friends; i++) {
            if(existingAccount.friends[i] == friendId) {
                existingAccount.friends.splice(i, 1);
            }
        }
        
        //console.log("Existing account after removing friend: ", existingAccount);
        
        Account.update({id: userId}, existingAccount, {upsert: true}, function (err, updatedAccount) {
            if(err) console.log('Err: ', err);
            return res.send(updatedAccount);
        });        
        
    });
});

router.get('/:id', function(req, res) {
    var id = req.params.id;
    Account.findOne({'id':id},function(err, result) {
        if(err) console.log('Err: ', err);
        return res.send(result);
    });             
});  

router.put('/:id', function(req, res) {
    var account = req.body;
    var id = account._id;

    delete account._id;

    if (id) {
        Account.update({_id: id}, account, {upsert: true}, function (err, account) {
            if(err) console.log('Err: ', err);
            //res.json(account);
            Account.findOne({'_id':id},function(err, result) {
                if(err) console.log('Err: ', err);
                return res.send(result);
            });           
        });
    }    
});

// Returns all the rounds for friends passed in via array of ids
router.put('/not-friends/:id', function(req, res) {
    var friends = req.body;
       
    Account.find({ id: { $nin: friends } }, function (err, accounts) {
        if(err) console.log('Err: ', err);
        res.json(accounts);
    });       
       
});

router.get('/:id/get-current-round-scores', function(req, res) {
    // returns the current round scores for this friend so you can update live scoring
    var id = req.params.id;
    Account.findOne({'id':id},function(err, result) {
        if(err) console.log('Err: ', err);
        return res.send(result);
    });             
});  

router.put('/:id/update-current-round', function(req, res) {
    var id = req.params.id;
    //console.log('Will save the current round data for user with id of: ', id);

    var roundData = req.body;

    //delete poll._id;

    if (id) {
        Account.findOne({'id':id},function(err, account) {
            if(err) console.log('Err: ', err);
            //console.log("Located account to update round for: ", account);
            
            var existingAccount = account;
            
            //console.log("Existing account before saving current round data: ", existingAccount);
            
            existingAccount.currentRound = roundData;
            
            Account.update({id: id}, existingAccount, {upsert: true}, function (err, updatedAccount) {
                if(err) console.log('Err: ', err);
                return res.send(updatedAccount);
            });            
        });         
    }    
});

router.put('/:id/finalize-current-round', function(req, res) {
    var id = req.params.id;
    //console.log('Will FINALIZE the current round data for user with id of: ', id);

    var roundData = req.body;
    var currentDate = moment().format('MM-DD-YYYY');
    
    // create entry in rounds table.
    var round = new Round({
      userId: req.body.userId,
      userName: req.body.userName,
      score: req.body.score,
      courseName: req.body.courseName,
      courseId: req.body.courseId,
      scoreToPar: req.body.scoreToPar,
      frontNineScores: req.body.userScoring.frontNineScores,
      backNineScores: req.body.userScoring.backNineScores,
      holes: req.body.userScoring.holes,
      date: currentDate
    });

    round.save(function (err, round) {
      if (err) { 
        console.log('error saving round: ', err);
      }
    });    

    if (id) {
        Account.findOne({'id':id},function(err, account) {
            if(err) console.log('Err: ', err);
            //console.log("Located account to update round for: ", account);
            
            var existingAccount = account;
            
            //console.log("Existing account before saving current round data: ", existingAccount);
            
            existingAccount.rounds.push({
                score: roundData.totalScore,
                courseId: roundData.chosenCourse,
                scoreToPar: roundData.scoreToPar,
                date: currentDate
            });
            existingAccount.currentRound.roundCompleted = 1;
            
            Account.update({id: id}, existingAccount, {upsert: true}, function (err, updatedAccount) {
                if(err) console.log('Err: ', err);
                return res.send(updatedAccount);
            });            
        });         
    }    
});

module.exports = router;
