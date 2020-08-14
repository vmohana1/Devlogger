const express = require('express');
const logsRoute = require('./controllers/logsRoute');
const app = express();

app.use(express.static("views")) // to load any static files
app.use('/logs', logsRoute);

app.listen(80, () => {
    console.log('App is running at 80');
})