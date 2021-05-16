const { isAuthenticated } = require("../middlewares/authMiddlewares");
const router = require("express").Router();

router.get("/", isAuthenticated, (req, res) => {
  res.render("dashboard");
});

module.exports = router;
