const { Router } = require("express");
const router = Router();
const User = require("../models/User");

router.get("/profile/:id", async (req, res) => {
  let user = await User.findOne({ _id: req.params.id }).populate(
    "subscriptions",
    "_id"
  );
  res.send(user);
});
router.post("/create", async (req, res) => {
  let user = new User({
    avatar: "woman.webp",
    name: "Соня",
    secondName: "Ждановская",
    password: "123",
    favorites: [],
    subscriptions: [],
  });
  await user.save();
  res.send("created");
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
