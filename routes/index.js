var express = require('express');;
var router = express.Router();

//Check if user is logged in
router.get('/', checkAuthentication, (req, res) => {
    res.render('index', {
        username: req.user.username,
        //tweet: tweet
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