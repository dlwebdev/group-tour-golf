var express = require('express');
var router = express.Router();
var moment = require('moment');

var Round = require('../server/models/round');

router.get('/', function(req, res) {
    Round.find({}, function (err, rounds) {
        if(err) console.log('Err: ', err);
        res.json(rounds);
    }); 
});

router.post('/', function(req, res) {
    // Create a new round
    console.log('Saving round: ', round);

    var currentDate = moment().format('MM-DD-YYYY');

    var round = new Round({
      userId: req.body.userId,
      userName: req.body.userName,
      score: req.body.score,
      courseName: req.body.courseName,
      courseId: req.body.courseId,
      scoreToPar: req.body.scoreToPar,
      date: currentDate
    });

    round.save(function (err, round) {
      if (err) { 
        console.log('error saving round: ', err);
      }
      res.status(201).json(round);
    });

});

router.get('/:id', function(req, res) {
    var id = req.params.id;
    Round.findOne({'_id':id},function(err, result) {
        if(err) console.log('Err: ', err);
        return res.send(result);
    });             
});


router.get('/rounds-for-user/:id', function(req, res) {
    var currentUserId = req.params.id;
    
    console.log("Looking for recent rounds for user with twitter id of: ", currentUserId);
    
    Round.find({ 'userId': currentUserId }, function (err, rounds) {
        if(err) console.log('Err: ', err);
        res.json(rounds);
    });            
});

// Returns all the rounds for friends passed in via array of ids
router.put('/get-friends-recent-rounds', function(req, res) {
    var friends = req.body;
       
    Round.find({ userId: { $in: friends } }, function (err, rounds) {
        if(err) console.log('Err: ', err);
        res.json(rounds);
    });       
       
});

module.exports = router;