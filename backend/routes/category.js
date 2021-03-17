const express = require("express");
const { requireSignin, adminMiddleware } = require("../controllers/auth");
const router = express.Router();
const { create, list, read, remove } = require("../controllers/category");

// validators
const { runValidation } = require("../validators");
const { categoryCreateValidator } = require("../validators/category");

// no category update route because the search engine will index the categories so
// you don't want to change them later; Will impact SEO negatively!
router.post(
  "/category",
  categoryCreateValidator,
  runValidation,
  requireSignin,
  adminMiddleware, // only admin can create a new category
  create
);
router.get("/categories", list);
router.get("/category/:slug", read);
router.delete(
  "/category/:slug",
  requireSignin,
  adminMiddleware, // only admin can delete a category
  remove
);

module.exports = router;
