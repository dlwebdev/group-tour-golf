var express = require('express');
var router = express.Router();

var Account = require('../server/models/account');

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
        console.log("Existing account for removing friend: ", existingAccount);
        
        for(var i = 0; i < existingAccount.friends; i++) {
            if(existingAccount.friends[i] == friendId) {
                existingAccount.friends.splice(i, 1);
            }
        }
        
        console.log("Existing account after removing friend: ", existingAccount);
        
        Account.update({id: userId}, existingAccount, {upsert: true}, function (err, updatedAccount) {
            if(err) console.log('Err: ', err);
            return res.send(updatedAccount);
        });        
        
    });
});

router.get('/:id', function(req, res) {
    var id = req.params.id;
    Account.findOne({'_id':id},function(err, result) {
        if(err) console.log('Err: ', err);
        return res.send(result);
    });             
});    

module.exports = router;
