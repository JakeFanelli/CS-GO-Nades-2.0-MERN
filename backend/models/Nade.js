const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Nades = new Schema({
  startX: {
    type: Number
  },
  startY: {
    type: Number
  },
  endX: {
    type: Number
  },
  endY: {
    type: Number
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
  }
});

module.exports = mongoose.model("nade", Nades);
