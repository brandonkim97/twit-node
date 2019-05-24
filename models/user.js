var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');


//Create db schema
var userSchema = mongoose.Schema({
    username: {
        type: String,
        index: true
    },
    password: String,
    image: String,
    bio: String,
    tweets: [],
    following: [],
    followers: [],
    likes: []
});

var User = module.exports = mongoose.model('User', userSchema);

module.exports.createUser = (newUser, callback) => {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            newUser.password = hash;
            newUser.save(callback);
        });
    });
}

module.exports.getUser = (username, callback) => {
    var query = {username: username};
    User.findOne(query, callback);
};

module.exports.getUserById = (id, callback) => {
    User.findById(id, callback);
};

module.exports.comparePassword = (password, hash, callback) => {
    bcrypt.compare(password, hash, (err, matches) => {
        if (err) throw err;
        callback(null, matches);
    });
};




