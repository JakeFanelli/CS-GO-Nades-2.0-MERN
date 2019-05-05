const passport = require("passport");
const mongoose = require("mongoose");
const User = mongoose.model("User");

exports.logout = (req, res) => {
  req.logout();
  res.sendStatus(200);
};

exports.validateSession = (req, res) => {
  if (req.isAuthenticated()) {
    res.sendStatus(200);
  }
};
