var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var mongoose = require('mongoose');
var passport = require('passport');
var moment = require('moment');

var MongoStore = require('connect-mongo')(session);

var rsvps = require('./routes/rsvps');
var users = require('./routes/users');
var courses = require('./routes/courses');
var accounts = require('./routes/accounts');

require('./server/passport')(passport);

var app = express();

if (app.get('env') !== 'production') {

  // expose node_modules to client app
  app.use(express.static(__dirname + "/node_modules"));
}

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'app')));

mongoose.connect('mongodb://admin:admin@ds013486.mlab.com:13486/group-golf-tour'); // Connect to MongoDB database for polling app.  

// Make sure mongod is running! If not, log an error and exit. 

mongoose.connection.on('error', function() {
  console.log('MongoDB Connection Error. Please make sure that MongoDB is running.');
  process.exit(1);
});

app.use(session({ 
  secret: 'my_precious_l@3', 
  cookie: { maxAge: 18000000 }, // Session set to 5 hours, enough for a round of golf
  saveUninitialized: false, // don't create session until something stored 
  resave: true, //don't save session if unmodified     
  rolling: true,
  name: 'ggt-session',
  store: new MongoStore({ mongooseConnection: mongoose.connection })
}));   

app.use(passport.initialize());
app.use(passport.session());   
  
var Account = require('./server/models/account');
  
app.get('/auth/twitter',
  passport.authenticate('twitter')
);

app.get('/auth/twitter/callback', 
  passport.authenticate('twitter', { failureRedirect: '/' }),
  function(req, res) {
    // Successful authentication, create account or update last log in time and then redirect home.
    
    var existingAccount;
    var hasAccount = false;
    var twitterId = req.user.twitter.id;
    var currentDate = moment().format('MM-DD-YYYY');
    
    Account.find({id: twitterId}, function (err, account) {
      //console.log('Found account with that twitter id: ', account);
      if(err) console.log('Err: ', err);
      
      if(account) {
        existingAccount = account[0]; 
      }
    }).then(function() {
      
      if(existingAccount) {
        //console.log("TRUE");
          hasAccount = true;
      }

      if(hasAccount) {
        //console.log('WILL UPDATE Account by updating last login: ', existingAccount);
        
        existingAccount.lastLogin = currentDate;
      
        Account.update({id: twitterId}, existingAccount, {upsert: true}, function (err, obj) {
            if(err) console.log('Err: ', err);
            //console.log('UPDATED SUCCESSFULLY!');
            res.redirect('/');
        });     
        
      } else { 
        //console.log('WILL CREATE NEW Account for this user.');
      
        var account = new Account({
          id: twitterId,
          username: req.user.twitter.username,
          handicap: 0,
          friends: [],
          rounds: [],
          currentRound: {},
          lastLogin: currentDate
        });
    
        account.save(function (err, account) {
          if (err) { console.log('error saving account: ', err); }
          res.redirect('/');
        });         
      }
      
    });
    
  }
);  

app.use('/api/user', users);
app.use('/api/rsvps', rsvps);
app.use('/api/courses', courses);
app.use('/api/accounts', accounts);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {

  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: {}
  });
});

module.exports = app;