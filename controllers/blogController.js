const express = require('express');
const blogRouter = express.Router();
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const Posts = require('../models/postsSchema');
blogRouter.use(bodyParser.json());


const fileName = path.join(__dirname, '../models/posts.json');

blogRouter.route('/')
  .all((req, res, next) => {
    res.setHeader('Content-Type', 'text/json');
    next();
  })
  .get((req, res) => {
    // res.setHeader('Content-Type', 'text/json');
    Posts.find({})
      .then(data => {
        res.end(JSON.stringify(data));
      })
      .catch(err => {
        res.end(JSON.stringify(err));
      });
  })
  .post((req, res) => {

    const post = req.body;
    Posts.create(post)
      .then((data) => {
        res.end(JSON.stringify(data));
      })
      .catch(err => {
        res.end(JSON.stringify(err));
      });

  })
  .delete((req, res)=> {
    Posts.remove({})
      .then(data => {
        res.end(JSON.stringify(data));
      })
      .catch(err => res.end(JSON.stringify(err)));
  })

blogRouter.route('/:postId')
  .all((req, res, next) => {
    res.setHeader('Content-Type', 'text/json');
    next();
  })
  .get((req, res) => {
    const postId = req.params.postId;
    Posts.find({ postId: postId })
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
    // fs.readFile(fileName, 'utf-8', (err, data) => {
    //   if (err) {
    //     res.statusCode = 404;
    //     res.end(JSON.stringify(err));
    //   }
    //   let fileData = data.length > 0 ? JSON.parse(data) : [];
    //   fileData = fileData.map(post => {
    //     return (parseInt(post.postId, 10) === parseInt(updatedPostId, 10) && updatedPost.postOwner === post.postOwner)
    //      ? {...post, ...updatedPost} : post;
    //   });
    //   fs.writeFile(fileName, JSON.stringify(fileData), (err, data) => {
    //     if (err) {
    //       res.statusCode = 404;
    //       res.end(JSON.stringify(err));
    //     }
    //     res.end(JSON.stringify(data));
    //   })
    // })
  })
  .delete((req, res) => {
    const postId = req.params.postId;
    Posts.remove({ postId })
      .then(data => {
        res.end(JSON.stringify(data));
      })
      .catch(err => res.end(JSON.stringify(err)));
  })


module.exports = blogRouter;
