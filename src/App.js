const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const session = require("express-session");
const authRoutes = require("../routes/authRoutes");
const profileRoutes = require("../routes/profileRoutes");
const chalk = require("chalk");
const { currentUser } = require("../middlewares/authMiddlewares");
const MongoDbStore = require("connect-mongodb-session")(session);

//@ App Initialization:
const app = express();

//@ Load Config:
require("dotenv").config();
require("./Database");

//@ Constants:
const port = process.env.PORT || 8000;
const views_path = path.join(__dirname, "../views");

//@ App Configuration:
app.set("views", views_path);
app.set("view engine", "ejs");

//@ App Middlewares:
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//@ DataBase for Express-Session, all this data will be managed by express-session store as we just provide the instance of this store to the express-session config.
const store = new MongoDbStore({
  uri: `mongodb://${process.env.SERVER_NAME}/${process.env.DB_NAME}`,
  collection: "mySession",
});

// Catch errors
store.on("error", function (error) {
  console.log(error);
});

//@ Session Config:
app.use(
  session({
    secret: process.env.SESSION_KEY,
    store: store,
    resave: false,
    saveUninitialized: false,
  })
);

//@ Routes Handling:
app.get("*", currentUser); // we are sending the user detail to every get request hence we used "*" here.
app.get("/", (req, res) => {
  res.render("index");
});

//@ Routes for Auth..
app.use("/auth", authRoutes);
app.use("/profile", profileRoutes);

//@ App Listening:
app.listen(port, () => {
  console.log(
    chalk.blue.italic.bold(`App is successfully running on port ${port}`)
  );
});
