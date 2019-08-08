const mongoose = require("mongoose");
const User = mongoose.model("User");
const { regexLower, regexUpper, regexNum, regexLength } = require("../helpers");

exports.validateRegister = (req, res, next) => {
  req.body.username = req.sanitize(req.body.username).trim();
  req.body.email = req.sanitize(req.body.email).trim();
  req.body.password = req.sanitize(req.body.password).trim();
  req.body.passwordConfirm = req.sanitize(req.body.passwordConfirm).trim();
  req.checkBody("username", "You must supply a Username!").notEmpty();
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
  req
    .check("username")
    .custom(value => (value.length < 25 ? true : false))
    .withMessage("Your username less than 25 characters.");
  req
    .check("email")
    .custom(value => (value.length < 35 ? true : false))
    .withMessage("Your email less than 35 characters.");
  req
    .check("password")
    .custom(value => (value.length < 25 ? true : false))
    .withMessage("Your password less than 25 characters.");
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
      if (
        err.message == "A user with the given username is already registered"
      ) {
        err = {
          msg: "An account with that email already exists."
        };
        let errors = [err];
        res.status(500).send({ errors });
      } else {
        let array = Object.keys(err).map(function(key) {
          return err[key];
        });
        let array2 = array[0];
        let errors = Object.keys(array2).map(function(key) {
          return array2[key];
        });
        errors.forEach(error => {
          if (error.path == "username") {
            error.msg = "An account with that username already exists.";
          }
        });
        res.status(500).send({ errors });
      }
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

exports.getAuthorUserName = (req, res) => {
  if (req.body.authorID) {
    User.findOne({ _id: req.body.authorID }, function(err, result) {
      if (err) {
        res.sendStatus(500);
      } else {
        res.status(200).send(result);
      }
    });
  }
};

exports.getAuthorUserNames = async (req, res) => {
  if (req.body.data) {
    let mappedArr = req.body.data.map(async nade => {
      await User.findOne({ _id: nade.authorID }).then(result => {
        nade.author = result.username;
      });
      return nade;
    });
    res.status(200).send(await Promise.all(mappedArr));
  }
};

exports.validateUpdate = (req, res, next) => {
  req.body.username = req.sanitize(req.body.username).trim();
  req.body.email = req.sanitize(req.body.email).trim();
  req.checkBody("email", "That Email is not valid!").isEmail();
  req.sanitizeBody("email").normalizeEmail({
    gmail_remove_dots: false,
    remove_extension: false,
    gmail_remove_subaddress: false
  });
  req
    .check("username")
    .custom(value => (value.length < 25 ? true : false))
    .withMessage("Your username less than 25 characters.");
  req
    .check("email")
    .custom(value => (value.length < 35 ? true : false))
    .withMessage("Your email less than 35 characters.");
  let errors = req.validationErrors();
  if (errors) {
    res.status(400).send({ errors });
  } else {
    next(); // there were no errors!
  }
};

exports.updateUser = (req, res) => {
  User.findOneAndUpdate(
    { email: req.session.passport.user },
    { $set: { email: req.body.email, username: req.body.username } },
    { runValidators: true, context: "query" },
    function(err, user) {
      if (err) {
        let array = Object.keys(err).map(function(key) {
          return err[key];
        });
        let array2 = array[0];
        let errors = Object.keys(array2).map(function(key) {
          return array2[key];
        });
        errors.forEach(error => {
          if (error.path == "email") {
            error.msg = "An account with that email already exists.";
          } else if (error.path == "username") {
            error.msg = "An account with that username already exists.";
          }
        });
        res.status(500).send({ errors });
      } else {
        req.session.passport.user = req.body.email;
        const updatedUser = {
          username: req.body.username,
          email: req.body.email
        };
        res.status(200).send(updatedUser);
      }
    }
  );
};
