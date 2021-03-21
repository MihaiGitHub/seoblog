const express = require("express");
const router = express.Router();
const { create } = require("../controllers/blog");
const { adminMiddleware, requireSignin } = require("../controllers/auth");

router.get("/blog", requireSignin, adminMiddleware, create);

module.exports = router;
