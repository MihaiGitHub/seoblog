const express = require("express");
const router = express.Router();

// controllers
const { requireSignin, adminMiddleware } = require("../controllers/auth");
const { create, list, read, remove } = require("../controllers/tag");

// validators
const { runValidation } = require("../validators");
const { createTagValidator } = require("../validators/tag");

// no category update route because the search engine will index the categories so
// you don't want to change them later; Will impact SEO negatively!
router.post(
  "/tag",
  createTagValidator,
  runValidation,
  requireSignin,
  adminMiddleware, // only admin can create a new category
  create
);
router.get("/tags", list);
router.get("/tag/:slug", read);
router.delete(
  "/tag/:slug",
  requireSignin,
  adminMiddleware, // only admin can delete a category
  remove
);

module.exports = router;
