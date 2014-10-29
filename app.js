/**
 * Lead Author: Express autogenerated most of it.
 */
var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

/*
 * Connect to the database.
 */
var constants = require("./models/constants");
var mongoose = require("mongoose");
mongoose.connect(constants.MONGO_URL);

var app = express();

/*
 * Define the routes.
 */
var auth_route = require('./routes/auth').initialize(mongoose);
var report_route = require('./routes/report').initialize(mongoose);
var subscribe_route = require('./routes/subscribe').initialize(mongoose);
var testing_route = require('./routes/testing').initialize(mongoose);


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/*
 * Set up the routes.
 */
app.use('/auth', auth_route);
app.use('/reports', report_route);
app.use('/subscriptions', subscribe_route);

// We don't use the testing route in production.
//app.use('/testing', subscribe_route);



/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


console.log("App listening on post 3000, go to localhost:3000/");
app.listen(3000);
module.exports = app;
