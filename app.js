const express = require('express');
const mongoose = require('mongoose');
const logsRoute = require('./controllers/logsRoute');
const blogRouter = require('./controllers/blogController');
const userRouter = require('./controllers/usersController');

const app = express();

const dbUrl = 'mongodb://localhost/testdb';

const connection = mongoose.connect(dbUrl);

connection.then((data) => {
  console.log('Application connected to DB');
})
.catch(err => console.log(err));


app.use(express.static("views"));

app.all('/', (req, res, next) => {
  res.setHeader('Content-Type', 'text/json');
  next();
});

app.use('/logs', logsRoute);

app.use('/blogs', blogRouter);
app.use('/user', userRouter);

app.listen(80, () => {
  console.log('App is running at 80');
});
