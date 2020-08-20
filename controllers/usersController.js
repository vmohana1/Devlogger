const express = require('express');
const userRouter = express.Router();
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const Users = require('../models/usersSchema');
userRouter.use(bodyParser.json());


const fileName = path.join(__dirname, '../models/users.json');

userRouter.route('/')
  .all((req, res, next) => {
    res.setHeader('Content-Type', 'text/json');
    next();
  })
  .get((req, res) => {
    // res.setHeader('Content-Type', 'text/json');
    Users.find({})
      .then(data => {
        res.end(JSON.stringify(data));
      })
      .catch(err => {
        res.end(JSON.stringify(err));
      });
  })
  .post((req, res) => {

    const post = req.body;
    Users.create(post)
      .then((data) => {
        res.end(JSON.stringify(data));
      })
      .catch(err => {
        res.end(JSON.stringify(err));
      });

  })
  .delete((req, res)=> {
    Users.remove({})
      .then(data => {
        res.end(JSON.stringify(data));
      })
      .catch(err => res.end(JSON.stringify(err)));
  })

  userRouter.route('/:postId')
  .all((req, res, next) => {
    res.setHeader('Content-Type', 'text/json');
    next();
  })
  .get((req, res) => {
    const postId = req.params.postId;
    Users.find({ postId: postId })
      .then(data => {
        if (data.length > 0) res.end(JSON.stringify(data));
        res.statusCode = 404;
        res.end('No Data found');
      })
      .catch(err => {
        res.end(JSON.stringify(err));
      });
  })
  .put((req, res) => {
    const updatedPost = req.body;
    const updatedPostId = req.params.postId;
    // console.log('PostId', updatedPostId);
    Posts.update({ postId: updatedPostId }, updatedPost)
      .then(data => {
        if (data.n > 0) res.end(`${data.n} records updated`);
        res.end('No records updated');
      })
      .catch(err => res.end(JSON.stringify(err)));
    
  })
  .delete((req, res) => {
    const postId = req.params.postId;
    Users.remove({ postId })
      .then(data => {
        res.end(JSON.stringify(data));
      })
      .catch(err => res.end(JSON.stringify(err)));
  })


module.exports = userRouter;
