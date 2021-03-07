const User = require("../models/user");
const shortId = require("shortid");
const jwt = require("jsonwebtoken");
// can check if token is valid or expired
const expressJwt = require("express-jwt");

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

exports.signin = (req, res) => {
  // check if user exists
  const { email, password } = req.body;
  User.findOne({ email }).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User with that email does not exist. Please signup.",
      });
    }

    // authenticate; uses authenticate method from User model which returns true or false
    if (!user.authenticate(password)) {
      return res.status(400).json({
        error: "Email and password do not match.",
      });
    }

    // generate jwt and send to client
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    // store token in cookie
    res.cookie("token", token, { expiresIn: "1d" });

    const { _id, username, name, email, role } = user;

    // send token in response to front-end
    return res.json({ token, user: { _id, username, name, email, role } });
  });
};

exports.signout = (req, res) => {
  res.clearCookie("token");
  res.json({
    message: "Signout success",
  });
};

// middleware to protect routes
// compares token secret with secret in env file
// returns true or false
exports.requireSignin = expressJwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"], // required by latest express-jwt module
  userProperty: "auth",
});
