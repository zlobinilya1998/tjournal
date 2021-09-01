const { Schema, model, ObjectId } = require("mongoose");

const Comment = new Schema(
  {
    text: { type: String, required: true },
    likes: { type: Number, default: 0 },
    user: { type: ObjectId, ref: "User", required: true },
    post: { type: ObjectId, ref: "Post", required: true },
  },
  { timestamps: true }
);
module.exports = model("Comment", Comment);
