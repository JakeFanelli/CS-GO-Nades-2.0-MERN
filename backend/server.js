const express = require("express");
const session = require("express-session");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const MongoStore = require("connect-mongo")(session);
const { promisify } = require("es6-promisify");
const router = express.Router();
require("./models/User");
const userController = require("./controllers/userController");
const authController = require("./controllers/authController");
const expressValidator = require("express-validator");
const passport = require("passport");
require("dotenv").config({ path: "variables.env" });
require("./handlers/passport");

app.use(cors());
app.use(bodyParser.json());
app.use(expressValidator());

mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true
});
mongoose.Promise = global.Promise;
const connection = mongoose.connection;
connection.once("open", function() {
  console.log("MongoDB connection established successfully.");
});

app.use(
  session({
    secret: process.env.SECRET,
    key: process.env.KEY,
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection })
  })
);

app.use(passport.initialize());
app.use(passport.session());

router.post(
  "/register",
  userController.validateRegister,
  userController.register
);

router.post("/login", passport.authenticate("local", {}), function(req, res) {
  res.sendStatus(200);
});

router.post("/logout", authController.logout);

app.use("/react-node", router);
app.set("port", process.env.PORT || 7777);
const server = app.listen(app.get("port"), () => {
  console.log(`Server is running on Port: ${server.address().port}`);
});
