const mongoose = require("mongoose");
const md5 = require("md5");
const validator = require("validator");
const mongodbErrorHandler = require("mongoose-mongodb-errors");
const passportLocalMongoose = require("passport-local-mongoose");
const Schema = mongoose.Schema;

let User = new Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    validate: [validator.isEmail, "Invalid Email Address"],
    required: "Please supply an email address"
  },
  name: {
    type: String,
    required: "Please supply a name",
    trim: true
  }
});

User.plugin(passportLocalMongoose, { usernameField: "email" });
User.plugin(mongodbErrorHandler);

module.exports = mongoose.model("User", User);
