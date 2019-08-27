const regexLower = new RegExp("^(?=.*[a-z])"),
  regexUpper = new RegExp("^(?=.*[A-Z])"),
  regexNum = new RegExp("^(?=.*[0-9])"),
  regexLength = new RegExp("^(?=.{8,})");

module.exports = { regexLower, regexUpper, regexNum, regexLength };
