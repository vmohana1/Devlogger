const express = require('express');
const userRouter = express.Router();
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

userRouter.use(bodyParser.json());


const fileName = path.join(__dirname, '../models/users.json');

userRouter.route('/')
  .get((req, res) => {
    fs.readFile(fileName, 'utf-8', (err, data) => {
        if (err) {
          res.statusCode = 404;
          res.end(JSON.stringify(err));
        }
      res.setHeader('Content-Type', 'text/json');
        const fileData = data;
        res.end(fileData);
      })
  })
  .post((req, res) => {
    fs.readFile(fileName, 'utf-8', (err, data) => {
        if (err) {
          res.statusCode = 404;
          res.end(JSON.stringify(err));
        }
        const post = req.body;
        let existingPosts = data.length > 0 ? JSON.parse(data) : [];
        existingPosts.push(post);
        fs.writeFile(fileName, JSON.stringify(existingPosts), (err, data) => {
          if (err) {
            res.statusCode = 404;
            res.end(JSON.stringify(err));
          }
          res.end(JSON.stringify(data));
        })
      })
  })
  
  userRouter.route('/:userId')
  .put((req, res) => {
    const updatedPost = req.body;
    const updatedUserId = req.params.userId;
    
    fs.readFile(fileName, 'utf-8', (err, data) => {
      if (err) {
        res.statusCode = 404;
        res.end(JSON.stringify(err));
      }
      let fileData = data.length > 0 ? JSON.parse(data) : [];
      fileData = fileData.map(post => {
        return (parseInt(post.userId, 10) === parseInt(updatedUserId, 10))
         ? {...post, ...updatedPost} : post;
      });
      fs.writeFile(fileName, JSON.stringify(fileData), (err, data) => {
        if (err) {
          res.statusCode = 404;
          res.end(JSON.stringify(err));
        }
        res.end(JSON.stringify(data));
      })
    })
  })

module.exports = userRouter;
