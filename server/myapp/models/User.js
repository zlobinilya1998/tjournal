const { Schema, model, ObjectId } = require("mongoose");

const User = new Schema(
  {
    avatar: { type: String, required: true },
    name: { type: String, required: true },
    secondName: { type: String, required: true },
    password: { type: String, required: true },
    favorite: [{ type: ObjectId, ref: "Post" }],
    subscriptions: [{ type: ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

module.exports = model("User", User);
