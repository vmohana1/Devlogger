const express = require('express');
const blogRouter = express.Router();
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

blogRouter.use(bodyParser.json());


const fileName = path.join(__dirname, '../models/posts.json');

blogRouter.route('/')
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

blogRouter.route('/:postId')
  .put((req, res) => {
    const updatedPost = req.body;
    const updatedPostId = req.params.postId;
    // console.log('PostId', updatedPostId);
    fs.readFile(fileName, 'utf-8', (err, data) => {
      if (err) {
        res.statusCode = 404;
        res.end(JSON.stringify(err));
      }
      let fileData = data.length > 0 ? JSON.parse(data) : [];
      fileData = fileData.map(post => {
        return (parseInt(post.postId, 10) === parseInt(updatedPostId, 10) && updatedPost.postOwner === post.postOwner)
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


module.exports = blogRouter;
