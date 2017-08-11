var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

const mongoose = require('mongoose');
const District = require('./models/district');
mongoose.connect(process.env.MONGOLAB_URI || process.env.MONGODB_URI || 'localhost:27017/nodetest1');

// New Code

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);

app.get('/voteson/:district_name', (req, res) => {
  District.findOne({ filename: req.params.district_name }, (err, district) => {
    if (err) {
      return res.json(err);
    }
    if (district) {
      res.json([district.hot, district.not]);
    } else {
      res.json([0, 0]);
    }
  });
});

app.get('/set/:district_name', (req, res) => {
  District.findOne({ filename: req.params.district_name }, (err, district) => {
    if (err) {
      return res.json(err);
    }
    if (district) {
      if (req.query.hot) {
        district.hot++;
        district.save((err) => {
          if (err) {
            return res.json(err);
          }
        });
      }
      if (req.query.not) {
        district.not++;
        district.save((err) => {
          if (err) {
            return res.json(err);
          }
        });
      }
    } else {
      var d = new District({
        hot: ((req.query.hot * 1) || 0),
        not: ((req.query.not * 1) || 0),
        filename: req.params.district_name
      });
      d.save((err) => {
        return res.json({ success: 'true' });
      });
    }
  });
});

app.use('/users', users);

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;
