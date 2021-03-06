const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      max: 32,
    }, // new arrival will be new-arrival as the slug
    slug: {
      type: String,
      unique: true,
      index: true,
    },
  },
  { timestamp: true }
);

// build a category model based on categorySchema
module.exports = mongoose.model("Category", categorySchema);
