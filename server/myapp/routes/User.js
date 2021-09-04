const { Router } = require("express");
const router = Router();
const User = require("../models/User");
const Post = require("../models/Post");

router.get("/profile/:id", async (req, res) => {
  let user = await User.findOne({ _id: req.params.id }).populate(
    "subscriptions",
    "_id"
  );
  res.send(user);
});
router.get("/posts/:id", async (req, res) => {
  let posts = await Post.find({ user: req.params.id })
    .populate("user")
    .populate({ path: "comments", populate: "user" })
    .populate({
      path: "reposts",
      populate: "user",
    })
    .sort({ createdAt: -1 });
  res.send(posts);
});
router.post("/login", async (req, res) => {
  let { email, password } = req.body;
  try {
    let user = await User.findOne({ email, password });
    console.log(user);
    if (!user) {
      return res.status(404).send({ message: "Пользователь не найден" });
    }
    res.send(user);
  } catch (e) {
    res.send(e);
  }
});
router.post("/create", async (req, res) => {
  let { name, secondName, password, email } = req.body;
  try {
    let userExists = await User.findOne({ email });
    if (userExists)
      return res.status(409).send({ message: "Пользователь уже существует" });
    let user = new User({
      avatar: "default.png",
      name,
      secondName,
      password,
      email,
      favorites: [],
      subscriptions: [],
    });
    await user.save();
    res.send(user);
  } catch (e) {
    res.send(e);
  }
});
router.put("/subscribe", async (req, res) => {
  let subscriber = await User.findOne({
    _id: req.body.subscriber,
  }).populate("subscriptions");

  let publisher = await User.findOne({
    _id: req.body.publisher,
  });

  if (
    subscriber.subscriptions.some(
      (user) => user._id.toString() === publisher._id.toString()
    )
  ) {
    return res.status(404).send({ error: "Подписка была оформлена ранее" });
  }

  subscriber.subscriptions.push(publisher);
  await subscriber.save();
  res.send(subscriber);
});
router.put("/unsubscribe", async (req, res) => {
  let subscriber = await User.findOne({
    _id: req.body.subscriber,
  }).populate("subscriptions");

  let publisher = await User.findOne({
    _id: req.body.publisher,
  });

  subscriber.subscriptions = subscriber.subscriptions.filter(
    (user) => user._id.toString() !== publisher._id.toString()
  );
  await subscriber.save();
  res.send(subscriber);
});

module.exports = router;
