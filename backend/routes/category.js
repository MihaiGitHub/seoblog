const express = require("express");
const { requireSignin, adminMiddleware } = require("../controllers/auth");
const router = express.Router();
const { create } = require("../controllers/category");

// validators
const { runValidation } = require("../validators");
const { categoryCreateValidator } = require("../validators/category");

router.post(
  "/category",
  categoryCreateValidator,
  runValidation,
  requireSignin,
  adminMiddleware, // only admin can create a new category
  create
);

module.exports = router;
