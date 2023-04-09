var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const POST = 3000;

var indexRouter = require('./routes/index');
var loginRouter = require('./routes/login');
var registerRouter = require('./routes/register');
var mainRouter = require('./routes/main');
var usersRouter = require('./routes/users');
var addProductRouter = require('./routes/addProduct');

var apiRouter = require('./routes/api');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.resolve(__dirname, 'public')));
// enable css
app.use(express.static(__dirname));


app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/main', mainRouter);
app.use('/users', usersRouter);
app.use('/manage/product', addProductRouter);
app.use('/api', apiRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    // địa chỉ api:    /api/userxxxxxxx 
    if (req.originalUrl.indexOf('/api') == 0) {
        res.json(
            {
                msg: err.message
            }
        );
    } else {
        res.render('error');
    }
});

module.exports = app;

app.listen(POST, () => {
    console.log(`App listening on port ${POST} at http://localhost:${POST}/login`)
});