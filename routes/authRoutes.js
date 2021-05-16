const router = require("express").Router();
const { handleErrors } = require("../helpers/handleError");
const User = require("../models/Users");

router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/signup", (req, res) => {
  res.render("signup");
});

router.get("/logout", (req, res) => {
  //logging out
  req.session.destroy(function (err) {
    if (err) {
      res.send(err);
    } else res.redirect("/");
  });
});

router.post("/signup", async (req, res) => {
  // Registering User
  const newUser = {
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  };
  try {
    const user = await User.create(newUser);
    res.status(201).json({ success: true, errors: null });
  } catch (error) {
    const err = handleErrors(error);
    res.status(500).json({ success: false, errors: err });
  }
});

router.post("/login", async (req, res) => {
  // login in user and creating session in database + send session to the browser
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    req.session.user = user._id;
    res.status(201).json({ success: true, errors: null });
  } catch (error) {
    const err = handleErrors(error);
    res.status(500).json({ success: false, errors: err });
  }
});

module.exports = router;
