const { Router } = require("express");
const router = Router();
const Category = require("../models/Category");

router.get("/", async (req, res) => {
  let categories = await Category.find();
  res.send(categories);
});

router.post("/create", async (req, res) => {
  let categories = [
    {
      name: "Спорт",
      icon: "fa-running",
    },
    {
      name: "Игры",
      icon: "fa-gamepad",
    },
    {
      name: "Интернет",
      icon: "fa-network-wired",
    },
    {
      name: "Политика",
      icon: "fa-flag",
    },
    {
      name: "Культура",
      icon: "fa-pagelines",
    },
  ];
  await Category.insertMany(categories);
  res.send("Categories created");
});

module.exports = router;
