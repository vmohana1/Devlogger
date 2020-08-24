const express = require('express');
const bodyParser = require('body-parser');
const logsRoute = express.Router();

let Logs = []; // 

logsRoute.use(bodyParser.json());

logsRoute.route('/')
  .get((req, res) => {
    res.setHeader('Content-Type', 'text/json');
    // res.cookie('user', req.query.user, { maxAge: 10000 });
    req.session.user = req.query.user;
    res.end(JSON.stringify(req.query));
  })
  .post((req, res) => {
    const log = req.params;
    console.log(log);
    // res.cookie('user', 'body')
    // Logs.push(log); // Databse insert
    // res.setHeader('Content-Type', 'text/json');
    res.end(JSON.stringify(req.params));
  })
  .put((req, res) => {
    const reqLog = req.body;
    Logs = Logs.map(log => {
      return log.id === reqLog.id ? reqLog : log
    });
    res.setHeader('Content-Type', 'text/json');
    res.end(JSON.stringify(Logs));
  })
  .delete((req, res) => {
    const logId =  req.body.id;
    Logs = Logs.filter(log => log.id !== logId);
    res.setHeader('Content-Type', 'text/json');
    res.end(JSON.stringify(Logs));
  });

  module.exports = logsRoute;


// const express = require('express');
// const bodyParser = require('body-parser');

// const logsRoute = express.Router();

// let Logs = [];

// logsRoute.use(bodyParser.json());

// logsRoute.route('/')
//     .get((req,res) => {
//         res.setHeader('Content-Type', 'text/json');
//         res.end(JSON.stringify(Logs));
//     })
//     .post((req,res) =>{
//         const log = req.body;
//         Logs.push(log); // database insert
//         res.setHeader('Content-Type','text/json');
//         res.end(JSON.stringify(Logs));
//     })
//     .put((req, res) => {
//         const reqLog = req.body;
//         Logs = Logs.map(log => {
//           return log.id === reqLog.id ? reqLog : log
//         });
//         res.setHeader('Content-Type', 'text/json');
//         res.end(JSON.stringify(Logs));
//       })
    
//     .delete((req,res)=>{
//         const logId =  req.body.id;
//         Logs = Logs.filter(log => log.id !== logId);
//         res.setHeader('Content-Type', 'text/json');
//         res.end(JSON.stringify(Logs));

//     })

//     module.exports = logsRoute;