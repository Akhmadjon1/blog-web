//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const _ = require("lodash");


const homeStartingContent = "";
const aboutContent = "";
const contactContent = "";

const app = express();


app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb+srv://akhmadjon:test-123@cluster0.oahlw.mongodb.net/blogDB", {useNewUrlParser: true});

const postSchema = {
  title: String,
  content: String
};

const Post = mongoose.model("Post", postSchema);



app.get("/", function(req, res) {
  Post.find({}, function(err, posts) {
  res.render("home", {
    startingContent: homeStartingContent, 
    posts: posts
  });
});
});

app.get("/about", function(req, res) {
  res.render("about", {about: aboutContent});
});

app.get("/contact", function(req, res) {
  res.render("contact", {contact: contactContent});
});

app.get("/compose", function(req, res) {
  res.render("compose");
});

app.post("/compose", function(req, res) {
  const post = new Post ({
    title: req.body.postTitle,
    content: req.body.postBody
  });


  post.save(function(err){
    if(!err){
      res.redirect("/",);
    }
  });
});

app.get("/posts/:postId", function(req, res) {
  const requestedTitle = _.lowerCase(req.params.postId);

  const requestedPostId = req.params.postId;

  
    Post.findOne({_id: requestedPostId}, function(err, post) {
        res.render("post", {
          title: post.title,
          content: post.content
        });
  });
});


let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

app.listen(port, function() {
  console.log("Server has started Successfully");
});