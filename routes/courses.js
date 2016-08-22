var express = require('express');
var router = express.Router();
var moment = require('moment');

var Course = require('../server/models/course');

router.get('/', function(req, res) {
    Course.find({}, function (err, courses) {
        if(err) console.log('Err: ', err);
        res.json(courses);
    }); 
});

router.post('/', function(req, res) {
    // Create a new course

    console.log('Saving course: ', course);

    var course = new Course({
      name: req.body.name,
      record: req.body.record,
      holes: req.body.holes,
      location: req.body.location
    });

    course.save(function (err, poll) {
      if (err) { 
        console.log('error saving course: ', err);
      }
      res.status(201).json(course);
    });

});

router.get('/:id', function(req, res) {
    var id = req.params.id;
    Course.findOne({'_id':id},function(err, result) {
        if(err) console.log('Err: ', err);
        return res.send(result);
    });             
});

router.put('/:id', function(req, res) {
    //let id = req.params.id;
    //console.log('Will update course with id of: ', id);

    var course = req.body;
    var id = course._id;

    delete course._id;

    if (id) {
        Course.update({_id: id}, course, {upsert: true}, function (err, course) {
            if(err) console.log('Err: ', err);
            //res.json(course);
            Course.findOne({'_id':id},function(err, result) {
                if(err) console.log('Err: ', err);
                return res.send(result);
            });           
        });
    }    
});

router.delete('/:id', function(req, res) {
    //return res.send('API Route to DELETE a course with id of: ' + req.params.id);
    var id = req.params.id;
    var userId = req.user.twitter.id;
    
    Course.remove({'_id': id},function(result) {
        Course.find({'creatorId': userId}, function (err, courses) {
          if(err) console.log('Err: ', err);
          res.json(courses);
        });        
    });    
});

module.exports = router;