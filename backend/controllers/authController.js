const passport = require("passport");
const mongoose = require("mongoose");
const User = mongoose.model("User");

exports.logout = (req, res) => {
  req.logout();
  res.sendStatus(200);
};
