const { Schema, model, ObjectId } = require("mongoose");

const Repost = new Schema(
  {
    user: { type: ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);
module.exports = model("Repost", Repost);
