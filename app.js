var express = require('express');
var socket = require('socket.io');
var bodyParser = require('body-parser');
var path = require('path');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var flash = require('connect-flash');
var passport = require('passport');
var methodOverride = require('method-override');
var expressValidator = require('express-validator');
var index = require('./routes/index');
var users = require('./routes/users');
var tweet = require('./routes/tweet');

var app = express();

//set up template engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//Bodyparser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

//Method Override middleware
app.use(methodOverride('_method'));

//Static folder
app.use(express.static(path.join(__dirname, 'public')));

//Express session
app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
}));

//Passport init
app.use(passport.initialize());
app.use(passport.session());

//Express validator
app.use(expressValidator({
    errorFormatter: (param, msg, value) => {
        var namespace = param.split('.')
        , root = namespace.shift()
        , formParam = root;

        while (namespace.length) {
            formParam += '[' + namespace.shift() + ']';
        }
        return {
            param : formParam,
            msg : msg,
            value : value
        };
    }
}));

//Connect flash
app.use(flash());

//Global vars
app.use( (req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    res.locals.tweet = req.tweet || null;
    next();
});

//Routes
app.use('/', index.router);
app.use('/users', users);
app.use('/tweet', tweet);

//Start server
app.set('port', (process.env.PORT || 3000));
// app.listen(app.get('port'), () => {
//     console.log('Server started on port ' + app.get('port'));
// })

var server = app.listen(app.get('port'), () => {
    console.log('Server started on port ' + app.get('port'));
});

