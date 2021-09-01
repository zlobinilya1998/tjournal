require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const router = express.Router();

const port = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());

app.use("/static", express.static("public"));
app.use("/api/posts", require("./routes/Post"));
app.use("/api/user", require("./routes/User"));
app.use("/api/upload", require("./routes/Upload"));
app.use("/api/category", require("./routes/Category"));
app.use("/api/comments", require("./routes/Comments"));

start = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://zlobinilya:zlobinilya1998@cluster0.qteqp.mongodb.net/tj?retryWrites=true&w=majority`,
      { useNewUrlParser: true, useUnifiedTopology: true }
    );
    app.listen(port, () => {
      console.log(`Server has been started on port:${port}`);
    });
  } catch (e) {
    console.log(`Error:${e}`);
  }
};

start();

module.exports = router;
