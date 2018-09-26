var express = require('express');;
var router = express.Router();

//Dashboard
router.get('/', checkAuthentication, (req, res) => {
    res.render('index');
});

//Notifications
router.get('/notifications', (req, res) => {
    res.render('notifications');
})

router.get('/home', (req, res) => {
    res.render('home');
});

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