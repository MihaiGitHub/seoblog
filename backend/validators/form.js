const { check } = require("express-validator");

exports.categoryCreateValidator = [
  check("name").not().isEmpty().withMessage("Name is required"),
  check("email").not().isEmail().withMessage("Must be a valid email address"),
  check("message")
    .not()
    .isEmpty()
    .isLength({ min: 20 })
    .withMessage("Message must be at least 20 characters long"),
];
