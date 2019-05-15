const mongoose = require("mongoose");
const User = mongoose.model("User");
const { regexLower, regexUpper, regexNum, regexLength } = require("../helpers");

exports.validateRegister = (req, res, next) => {
  req.sanitizeBody("username");
  req.checkBody("username", "You must supply a username!").notEmpty();
  req.checkBody("email", "That Email is not valid!").isEmail();
  req.sanitizeBody("email").normalizeEmail({
    gmail_remove_dots: false,
    remove_extension: false,
    gmail_remove_subaddress: false
  });
  req.checkBody("password", "Password Cannot be Blank!").notEmpty();
  req
    .checkBody("passwordConfirm", "Confirmed Password cannot be blank!")
    .notEmpty();
  req
    .checkBody("passwordConfirm", "Oops! Your passwords do not match")
    .equals(req.body.password);

  req
    .check("password")
    .custom(value => (regexLower.test(value) ? true : false))
    .withMessage("Your password must contain 1 lowercase letter.");
  req
    .check("password")
    .custom(value => (regexUpper.test(value) ? true : false))
    .withMessage("Your password must contain 1 uppercase letter.");
  req
    .check("password")
    .custom(value => (regexNum.test(value) ? true : false))
    .withMessage("Your password must contain 1 number.");
  req
    .check("password")
    .custom(value => (regexLength.test(value) ? true : false))
    .withMessage("Your password must be 8 characters or longer.");
  let errors = req.validationErrors();
  if (errors) {
    res.status(400).send({ errors });
  } else {
    next(); // there were no errors!
  }
};

exports.register = async (req, res, next) => {
  const user = new User({
    email: req.body.email,
    username: req.body.username
  });
  User.register(user, req.body.password, function(err, user) {
    if (err) {
      res.status(400).send({ err });
    } else {
      next();
    }
  });
};

exports.getUser = (req, res) => {
  if (req.session.passport) {
    const id = req.session.passport.user;
    User.findOne({ email: id }, function(err, result) {
      if (err) {
        res.sendStatus(401);
      } else {
        res.status(200).send(result);
      }
    });
  } else {
    res.status(200).send({ msg: "no" });
  }
};

exports.getUserId = async (req, res, next) => {
  if (req.body.email) {
    User.findOne({ email: req.body.email }, function(err, result) {
      if (err) {
        res.sendStatus(401);
      } else {
        res.status(200).send(result);
      }
    });
  } else {
    res.sendStatus(200).send({ msg: "no" });
  }
};

exports.updateUser = (req, res, next) => {
  User.findOneAndUpdate(
    { email: req.session.passport.user },
    { $set: { username: req.body.username, email: req.body.email } },
    function(err, user) {
      if (err) {
        res.sendStatus(500);
      } else {
        req.session.passport.user = req.body.email;
        res.sendStatus(200);
      }
    }
  );
};
