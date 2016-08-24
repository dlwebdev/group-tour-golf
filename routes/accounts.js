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

router.get('/:userId/friends', function(req, res, next) {
    var id = req.params.userId;
    Account.findOne({'id':id},function(err, result) {
        if(err) console.log('Err: ', err);
        return res.send(result.friends);
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
