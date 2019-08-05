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
        res.status(500).send(err);
      } else {
        res.status(200).send(result);
      }
    });
  }
};

exports.validateNade = (req, res, next) => {
  req.body.nadeTitle = req.sanitize(req.body.nadeTitle).trim();
  req.body.nadeURL = req.sanitize(req.body.nadeURL).trim();
  req.checkBody("nadeTitle", "You must supply a title!").notEmpty();
  req
    .check("nadeTitle")
    .custom(value => (value.length < 50 ? true : false))
    .withMessage("Title must be less than 50 characters");
  req.checkBody("nadeURL", "You must supply a url!").notEmpty();
  req
    .check("startX")
    .custom(value => (value !== 0 ? true : false))
    .withMessage("You must plot the nade below!");
  req
    .check("endX")
    .custom(value => (value !== 0 ? true : false))
    .withMessage("You must plot the nade below!");
  req
    .check("nadeURL")
    .custom(value =>
      value.substring(0, 25) === "https://giant.gfycat.com/" ? true : false
    )
    .withMessage("Only submit gfycat urls!");
  req
    .check("nadeURL")
    .custom(value =>
      value.substring(value.length - 3, value.length) === "mp4" ? true : false
    )
    .withMessage("Only submit mp4 gfycat urls!");
  if (req.body.lines === "2") {
    req
      .check("midX")
      .custom(value => (value !== 0 ? true : false))
      .withMessage("You have lines set to 2 and didn't include a 2nd line");
  }
  req
    .check("loggedIn")
    .custom(value => (value !== false ? true : false))
    .withMessage("You must be logged in!");
  let errors = req.validationErrors();
  if (errors) {
    res.status(400).send({ errors });
  } else {
    next(); // there were no errors!
  }
};

exports.submitNade = (req, res) => {
  const nade = new Nades({
    startX: req.body.startX,
    startY: req.body.startY,
    midX: req.body.midX,
    midY: req.body.midY,
    endX: req.body.endX,
    endY: req.body.endY,
    lines: req.body.lines,
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
