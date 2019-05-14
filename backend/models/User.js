const mongoose = require("mongoose");
const md5 = require("md5");
const validator = require("validator");
const mongodbErrorHandler = require("mongoose-mongodb-errors");
const passportLocalMongoose = require("passport-local-mongoose");
const Schema = mongoose.Schema;

const User = new Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    validate: [validator.isEmail, "Invalid Email Address"],
    required: "Please supply an email address"
  },
  username: {
    type: String,
    required: "Please supply a username",
    trim: true
  },
  date: {
    type: Date,
    default: Date.now()
  }
});

User.plugin(passportLocalMongoose, { usernameField: "_id" });
User.plugin(mongodbErrorHandler);

module.exports = mongoose.model("User", User);
