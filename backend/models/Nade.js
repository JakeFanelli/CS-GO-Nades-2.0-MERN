const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Nades = new Schema({
  startX: {
    type: Number
  },
  startY: {
    type: Number
  },
  midX: {
    type: Number
  },
  midY: {
    type: Number
  },
  endX: {
    type: Number
  },
  endY: {
    type: Number
  },
  lines: {
    type: String
  },
  side: {
    type: String
  },
  title: {
    type: String
  },
  type: {
    type: String
  },
  url: {
    type: String
  },
  map: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now()
  },
  authorID: {
    type: String
  },
  verified: {
    type: Boolean
  },
  likesArr: {
    type: Array
  },
  dislikesArr: {
    type: Array
  }
});

module.exports = mongoose.model("nade", Nades);
