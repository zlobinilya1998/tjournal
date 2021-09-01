const { Router } = require("express");
const router = Router();
const Comment = require("../models/Comment");
const Post = require("../models/Post");
const events = require("events");
const emitter = new events.EventEmitter();

router.get("/subscribe", async (req, res) => {
  emitter.once("new-comment", async () => {
    let comments = await Comment.find()
      .populate("user")
      .populate("post")
      .sort({ createdAt: -1 });
    res.send(comments);
  });
});

router.get("/", async (req, res) => {
  let comments = await Comment.find()
    .populate("user")
    .populate("post")
    .sort({ createdAt: -1 });
  res.send(comments);
});
router.get("/user/:id", async (req, res) => {
  let { id } = req.params;
  let comments = await Comment.find({ user: id })
    .populate("user")
    .populate("post")
    .sort({ createdAt: -1 });
  res.send(comments);
});
router.post("/create", async (req, res) => {
  let { _id, userId, text } = req.body;
  let post = await Post.findOne({ _id });
  let newComment = new Comment({
    text: text,
    user: userId,
    post: _id,
  });
  await newComment.save();

  post.comments.push(newComment);
  await post.save();
  post = await Post.findOne({ _id })
    .populate("user")
    .populate({ path: "comments", populate: "user" });
  emitter.emit("new-comment");
  res.send(post);
});
module.exports = router;
