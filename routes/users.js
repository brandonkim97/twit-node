var express = require('express');
var router = express.Router();
var User = require('../models/user');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

//Register
router.get('/register', function (req, res) {
    res.render('register');
});

//Login
router.get('/login', function (req, res) {
    res.render('login');
});

//Register user
router.post('/register', function (req, res) {
    var username = req.body.username;
    var password = req.body.password;
    var password2 = req.body.password2;

    //Validation
    req.checkBody('username', 'Username is required').notEmpty();
    req.checkBody('password', 'Password is required').notEmpty();
    req.checkBody('password2', 'Passwords do not match').equals(req.body.password);


    var errors = req.validationErrors();
    if (errors) {
        res.render('register', {
            errors: errors,
        });
    } else {
        var newUser = new User( {
            username: username,
            password: password
        });

        User.createUser(newUser, (err, user) => {
            if (err) throw err;
            console.log(user);
        });

        req.flash('success_msg', 'Thank you for registering!');
        res.locals.message = req.flash();
        res.redirect('/users/login');
    }
    
});

passport.use(new LocalStrategy((username, password, done) => {
        User.getUser(username, (err, user) => {
            if (err) throw err;

            if(!user) {
                return done(null, false, {message: 'Unknown User'});
            }

            User.comparePassword(password, user.password, (err, matches) => {
                if (err) throw err;

                if (matches) return done(null, user);
                else return done(null, false, {message: 'Invalid password'});
            });
        });
    }
));

passport.serializeUser( (user, done) => {
    done(null, user.id);
});

passport.deserializeUser( (id, done) => {
    User.getUserById(id, (err, user) => {
        done(err, user);
    });
});

router.post('/login', passport.authenticate('local', {successRedirect: '/', 
    failureRedirect: '/home', failureFlash: true}), 
    (req,res) => {
        var username = req.body.username;
        var password = req.body.password;

        //Validation
        req.checkBody('username', 'Username is required').notEmpty();
        req.checkBody('password', 'Password is required').notEmpty();

        var errors = req.validationErrors();
        console.log(`errors: ${errors}`);
        if (errors) {
            res.render('home', {
                errors: errors
            });
            req.flash('error_msg', 'Wrong input');
            res.locals.message = req.flash();
            res.redirect('/');
        }
    });

router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success_msg', 'You have successfully logged out');
    res.redirect('/');
});
module.exports = router;