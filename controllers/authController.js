exports.logout = (req, res) => {
  req.logout();
  req.session.destroy(function(err) {
    if (!err) {
      res.clearCookie(process.env.KEY, {
        path: "/"
      });
      res.sendStatus(200);
    }
  });
};

exports.validateSession = (req, res) => {
  if (req.isAuthenticated()) {
    res.status(200).send({ msg: "yes" });
  } else {
    res.status(200).send({ msg: "no" });
  }
};
