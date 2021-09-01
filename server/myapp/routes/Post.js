const { Router } = require("express");
const router = Router();
const Post = require("../models/Post");
const Repost = require("../models/Repost");
const events = require("events");
const emitter = new events.EventEmitter();

router.get("/", async (req, res) => {
  let posts = await Post.find()
    .populate("user")
    .populate({ path: "comments", populate: "user" })
    .populate({
      path: "reposts",
      populate: "user",
    })
    .sort({ createdAt: -1 });
  res.send(posts);
});
router.get("/post/:id", async (req, res) => {
  let post = await Post.findOne({ _id: req.params.id })
    .populate("user")
    .populate({ path: "comments", populate: "user" });
  res.send(post);
});
//Long pooling subscribe
router.get("/subscribe", async (req, res) => {
  emitter.once("new-post", async () => {
    let posts = await Post.find()
      .populate("user")
      .populate({ path: "comments", populate: "user" })
      .populate({
        path: "reposts",
        populate: "user",
      })
      .sort({ createdAt: -1 });
    res.send(posts);
  });
});

router.put("/like", async (req, res) => {
  let { _id } = req.body;
  let post = await Post.findOne({ _id })
    .populate("user")
    .populate({ path: "comments", populate: "user" });
  post.likes += 1;
  await post.save();
  res.send(post);
});

router.put("/dislike", async (req, res) => {
  let { _id } = req.body;
  let post = await Post.findOne({ _id })
    .populate("user")
    .populate({ path: "comments", populate: "user" });
  post.likes -= 1;
  await post.save();
  res.send(post);
});
router.post("/create", async (req, res) => {
  let { newPost } = req.body;
  let post = new Post(newPost);
  await post.save();
  emitter.emit("new-post");
  res.send("Нужно закодить");
});
router.post("/repost/create", async (req, res) => {
  let { _id } = req.body;
  let post = await Post.findOne({ _id })
    .populate("user")
    .populate({ path: "comments", populate: "user" })
    .populate("reposts");
  let newRepost = new Repost({
    user: "612926b0e5e633e62c8e042f",
  });
  await newRepost.save();
  post.reposts.push(newRepost);
  await post.save();
  res.send(post);
});
module.exports = router;
