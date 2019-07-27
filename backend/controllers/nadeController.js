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

exports.submitNade = (req, res) => {
  const nade = new Nades({
    startX: req.body.startX,
    startY: req.body.startY,
    endX: req.body.endX,
    endY: req.body.endY,
    side: req.body.selectedSideOption,
    title: req.body.nadeTitle,
    type: req.body.selectedOption,
    url: req.body.nadeURL,
    map: req.body.mapChoice,
    authorID: req.user._id
  });
  nade.save(function(err, results) {
    if (err) {
      res.sendStatus(500);
    } else {
      res.status(200).send(results);
    }
  });
};
