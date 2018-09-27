var express = require('express');;
var router = express.Router();
var path = require('path');

//Dashboard
router.get('/', checkAuthentication, (req, res) => {
    res.render('index');
});

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

//SPA routes to send to user
const handler = (req, res) => {
    res.render('../views/index');
};
const routes = ['/', '/notifications'];
routes.forEach( route => router.get(route, handler));

module.exports = {
    authenticate: checkAuthentication,
    router: router
};