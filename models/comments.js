var mongoose = require('mongoose');

var Comment = mongoose.model('Comment', {
    username: String,
    body: String,
    image: String,
    date: String,
    likes: Array,
});

module.exports = Comment;