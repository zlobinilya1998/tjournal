const { Schema, model, ObjectId } = require("mongoose");

const Post = new Schema(
  {
    img: { type: String, required: true },
    icon: { type: String, required: true },
    title: { type: String, required: true },
    subtitle: { type: String, required: true },
    category: { type: String, required: true },
    likes: { type: Number, default: 0 },
    user: { type: ObjectId, ref: "User", required: true },
    comments: [{ type: ObjectId, ref: "Comment" }],
    reposts: [{ type: ObjectId, ref: "Repost" }],
  },
  { timestamps: true }
);
module.exports = model("Post", Post);
