const mongoose = require("mongoose");
const Nades = mongoose.model("nade");

exports.loadNades = (req, res) => {
  if (req.body.mapTitle) {
    Nades.find({ map: req.body.mapTitle }, function(err, result) {
      if (err) {
        res.sendStatus(500);
      } else {
        res.status(200).send(result);
      }
    });
  }
};

exports.loadNadeVideo = (req, res) => {
  if (req.body.nadeID) {
    Nades.findOne({ _id: req.body.nadeID }, function(err, result) {
      if (err) {
        res.sendStatus(500);
      } else {
        res.status(200).send(result);
      }
    });
  }
};
