const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      min: 3,
      max: 160,
      required: true,
    }, // instead of ID use slug so index: true
    slug: {
      type: String,
      unique: true,
      index: true,
    },
    body: {
      // {} can store all kinds of data (binary, strings, html...etc)
      type: {},
      required: true,
      min: 200,
      max: 2000000, // 2 Mb
    },
    excerpt: {
      type: String,
      max: 1000,
    }, // metatitle
    mtitle: {
      type: String,
    }, // metadescription
    mdesc: {
      type: String,
    },
    photo: {
      data: Buffer,
      contentType: String,
    },
    categories: [{ type: ObjectId, ref: "Category", required: true }],
    tags: [{ type: ObjectId, ref: "Tag", required: true }],
    postedBy: {
      // ObjectId will refer to User model
      type: ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Blog", blogSchema);
