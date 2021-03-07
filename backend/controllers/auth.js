const User = require("../models/user");
const shortId = require("shortid");

exports.signup = (req, res) => {
  User.findOne({ email: req.body.email }).exec((err, user) => {
    // if email is in database user already exists
    if (user) {
      return res.status(400).json({
        error: "Email is taken",
      });
    }

    const { name, email, password } = req.body;

    // generate a unique id
    let username = shortId.generate();

    // generate a profile url
    let profile = `${process.env.CLIENT_URL}/profile/${username}`;

    let newUser = new User({ name, email, password, profile, username });

    newUser.save((err, success) => {
      if (err) {
        return res.status(400).json({ error: err });
      }

      res.json({ message: "Signup success! Please signin." });
    });
  });
};
