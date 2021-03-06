const { validationResult } = require("express-validator");

exports.runValidation = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    // send the very first error message
    return res.status(422).json({ error: errors.array()[0].msg });
  }

  next();
};
