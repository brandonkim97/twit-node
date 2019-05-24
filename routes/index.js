var express = require('express');;
var router = express.Router();
var Tweet = require('../models/tweets');
var User = require('../models/user');

//Check if user is logged in
router.get('/', checkAuthentication, (req, res) => {
    Tweet.find({}).exec( (err, tweets) => {
        if (err) throw err;
        User.getUserById(req.user.id, (err, user) => {
            res.render('index', {
                user: user,
                username: user.username,
                tweets: tweets,
            });
        });
    });
});
    

//Notifications tab
router.get('/notifications', checkAuthentication, (req, res) => {
    res.render('notifications');
});

//Get home page
router.get('/home', (req, res) => {
    res.render('home');
});

//Get user profile
router.get('/user/:id', (req, res) => {
    // User.getUser(req.params.id, (err, user) => {
    //     res.render('user', {
    //         user: user,
    //         username: user.username,
    //         tweets: user.tweets
    //     });
    // });
    Tweet.find({}).exec( (err, tweets) => {
        if (err) throw err;
        User.getUserById(req.user.id, (err, user) => {
            res.render('user', {
                user: user,
                username: user.username,
                tweets: tweets
            });
        });
    });
});

//Check if user is logged in
function checkAuthentication(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        res.redirect('home');
    }
}

module.exports = {
    authenticate: checkAuthentication,
    router: router
};