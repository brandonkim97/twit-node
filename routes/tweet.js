var express = require('express');
var router = express.Router();
var index = require('./index');
var Tweet = require('../models/tweets');
var Comment = require('../models/comments');
var User = require('../models/user');

router.get('tweet', (req, res) => {
    res.render('tweet');
});

router.post('/status', index.authenticate, (req, res) => {
        var date = new Date();
        var month = date.getMonth() + 1;
        var day = date.getDate();
        var year = date.getFullYear();
        var username = req.user.username;
        var image = req.body.image;
        var status = req.body.status;
        var date = `${month}/${day}/${year}`;


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
            //console.log(username + ' has posted a tweet');
        });
        User.findByIdAndUpdate(
            { _id: req.user.id },
            {$push: {tweets: newTweet._id}},
            {safe: true, upsert: true, new : true},
            (err, model) => {
                if (err) throw err;
            }
        );
        res.end();
});

//Delete a status
router.delete('/:id/status', (req, res) => {
    var tweetID = req.params.id;
    console.log('tweet id: ' + tweetID);
    console.log('user id: ' + req.user._id)
    // Tweet.findByIdAndDelete(tweetID, (err, deletedTweet) => {
    //     if (err) throw err;
    // });
    User.update(
        { _id : req.user._id },
        { $pull: { tweets: { $in: tweetID} } }, 
        {safe: true, upsert: true, new : true}, 
        (err, obj) => {
            res.redirect('/')
    });
    
});

// Post a comment
router.post('/:id/comments', (req, res) => {
    var comment = req.body.comments;
    var date = new Date();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var year = date.getFullYear();
    var username = req.user.username;
    var image = req.body.image;
    var date = `${month}/${day}/${year}`;

    var commentData = {
        username: username,
        body: comment,
        image: image,
        date: date,
        likes: []
    };
    var newComment = new Comment(commentData);
    newComment.save( (err) => {
        if (err) throw err;
        //console.log(username + ' has posted a comment');
    });
    Tweet.findByIdAndUpdate(
        { _id: req.params.id },
        { $push: {comments: newComment }},
        {safe: true, upsert: true, new : true},
        (err, model) => {
            if (err) throw err;
        });
    res.redirect('/');
});
module.exports = router;
