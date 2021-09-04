const { Router } = require("express");
const router = Router();
const Post = require("../models/Post");

router.get("/", async (req, res) => {
  let posts = await Post.find();
  res.send(posts);
});

module.exports = router;
