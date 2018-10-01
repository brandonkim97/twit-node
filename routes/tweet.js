var express = require('express');
var router = express.Router();
var index = require('./index');
var Tweet = require('../models/tweets');

router.get('tweet', (req, res) => {
    res.render('tweet')
});
router.post('/status', index.authenticate, (req, res) => {
        var username = req.user.username;
        var image = req.body.image;
        var status = req.body.status;
        var date = new Date().getDate();


        var tweetData = {
            username: username,
            body: status,
            image: image,
            date: date,
            likes: [],
            comments: []
        };
        
        var newTweet = new Tweet(tweetData);
        newTweet.save( (err) => {
            if (err) throw err;
            console.log(username + ' has posted a tweet');
        });
        res.render('index', {
            tweet: tweetData
        });
});

module.exports = router;
