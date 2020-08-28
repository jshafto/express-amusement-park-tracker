const express = require('express');
const morgan = require('morgan');
const routes = require('./routes');
const { restart } = require('nodemon');
const app = express();

app.set('view engine', 'pug');
app.use(morgan('dev'));


app.use(routes);

app.use((req, res, next) => {
  const err = new Error('The request page could not be found.');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'test') {
    //insert error logging to database
  } else {
    console.error(err);
  }
  next(err);
});

app.use((err, req, res, next) => {
  if (err.status === 404) {
    res.status(404);
    res.render('page-not-found', {
      title: 'Page Not Found'
    });
  } else {
    next(err)
  }
})

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.render('error', { title: 'Server Error' })
})






module.exports = app;
