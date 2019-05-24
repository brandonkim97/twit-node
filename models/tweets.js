var mongoose = require('mongoose');

var Tweet = mongoose.model('Tweet', {
    username: String,
    body: String,
    image: String,
    date: String,
    likes: Array,
    comments: Array
});

// var t = {
//     username: 'username',
//     body: 'body',
//     image: 'img',
//     date: new Date().getDate(),
//     likes: [],
//     comments: []
// };

// var tweet = new Tweet(t);

module.exports =  Tweet;
