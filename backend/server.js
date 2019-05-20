const express = require("express");
const cors = require("cors");
const app = express();
const session = require("express-session");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const MongoStore = require("connect-mongo")(session);
const router = express.Router();
require("./models/User");
const userController = require("./controllers/userController");
const authController = require("./controllers/authController");
const expressValidator = require("express-validator");
const passport = require("passport");
require("dotenv").config({ path: "variables.env" });
require("./handlers/passport");

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(expressValidator());
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);

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
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
    cookie: {
      secure: false,
      httpOnly: false,
      expires: new Date(Date.now() + 1.21e9)
    }
  })
);

app.use(passport.initialize());
app.use(passport.session());

router.get("/validateSession", authController.validateSession);

router.get("/user", userController.getUser);
router.post("/userId", userController.getUserId);

router.post(
  "/register",
  userController.validateRegister,
  userController.register,
  passport.authenticate("local", {}),
  function(req, res) {
    res.sendStatus(200);
  }
);

router.post("/login", passport.authenticate("local", {}), function(req, res) {
  res.sendStatus(200);
});

router.post("/logout", authController.logout);

router.post("/updateUser", userController.updateUser);

app.use("/react-node", router);
app.set("port", process.env.PORT || 7777);
const server = app.listen(app.get("port"), () => {
  console.log(`Server is running on Port: ${server.address().port}`);
});
