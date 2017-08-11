var fs = require('fs');

var express = require('express');
var router = express.Router();
const District = require('../models/district');

var allImages = [];

fs.readdir(__dirname + '/../public/images', function(err, items) {
  if (err) {
    throw err;
  }
  allImages = items;
});

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', {
      title: 'Hot or Not',
      allImages: allImages
  });
});

/* GET Hello World page. */
router.get('/helloworld', function(req, res) {
	res.render('helloworld', { title: 'Hello, World!' })
});

/* GET Userlist page. */
router.get('/userlist', function(req, res) {
    var db = req.db;
    var collection = db.get('usercollection');
    collection.find({},{},function(e,docs){
        res.render('userlist', {
            "userlist" : docs
        });
    });
});

/* GET New User page. */
router.get('/newuser', function(req, res) {
    res.render('newuser', { title: 'Add New User' });
});

/* POST to Add User Service */
router.post('/adduser', function(req, res) {

    // Set our internal DB variable
    var db = req.db;

    // Get our form values. These rely on the "name" attributes
    var userName = req.body.username;
    var userEmail = req.body.useremail;

    // Set our collection
    var collection = db.get('usercollection');

    // Submit to the DB
    collection.insert({
        "username" : userName,
        "email" : userEmail
    }, function (err, doc) {
        if (err) {
            // If it failed, return error
            res.send("There was a problem adding the information to the database.");
        }
        else {
            // If it worked, set the header so the address bar doesn't still say /adduser
            //res.location("userlist");
            // And forward to success page
            res.redirect("userlist");
        }
    });
});

router.get('/voteson/:district_name', (req, res) => {
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

router.get('/set/:district_name', (req, res) => {
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


module.exports = router;
