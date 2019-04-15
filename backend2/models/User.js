const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: "Please supply a name"
  },
  email: {
    type: String,
    required: "Please supply an email address"
  },
  password: {
    type: String,
    required: "Please supply a password"
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = User = mongoose.model("users", UserSchema);
