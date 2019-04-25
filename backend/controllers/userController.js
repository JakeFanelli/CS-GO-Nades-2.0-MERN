const mongoose = require("mongoose");
const User = mongoose.model("User");
const { promisify } = require("es6-promisify");

let regexLower = new RegExp("^(?=.*[a-z])");
let regexUpper = new RegExp("^(?=.*[A-Z])");
let regexNum = new RegExp("^(?=.*[0-9])");
let regexLength = new RegExp("^(?=.{8,})");

exports.validateRegister = (req, res, next) => {
  req.sanitizeBody("name");
  req.checkBody("name", "You must supply a name!").notEmpty();
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
  const user = new User({ email: req.body.email, name: req.body.name });
  User.register(user, req.body.password, function(err, user) {
    res.sendStatus(200);
  });
};
