const User = require("../models/Users");

module.exports.isAuthenticated = (req, res, next) => {
  if (req.session.user) {
    next();
  } else {
    res.redirect("/");
  }
};

module.exports.currentUser = async (req, res, next) => {
  if (!req.session.user) {
    res.locals.user = null;
    next();
  } else {
    let user = await User.findById(req.session.user);
    res.locals.user = user;
    next();
  }
};
