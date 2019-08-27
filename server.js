const express = require("express");
const cors = require("cors");
const app = express();
const session = require("express-session");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const MongoStore = require("connect-mongo")(session);
const router = express.Router();
const expressSanitizer = require("express-sanitizer");
require("./models/User");
require("./models/Nade");
const userController = require("./controllers/userController");
const authController = require("./controllers/authController");
const nadesController = require("./controllers/nadeController");
const expressValidator = require("express-validator");
const passport = require("passport");
const path = require("path");
require("dotenv").config({ path: "variables.env" });
require("./handlers/passport");

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(expressValidator());
app.use(expressSanitizer());
app.use(express.static(path.join(__dirname, "frontend", "build")));
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

router.post(
  "/updateUser",
  userController.validateUpdate,
  userController.updateUser
);

router.post(
  "/forgotPassword",
  userController.validateForgotPassword,
  userController.forgotPassword
);
router.post("/confirmResetPassword", userController.confirmResetPassword);
router.post(
  "/updatePassword",
  userController.validateUpdatePassword,
  userController.updatePassword
);

router.post("/loadNades", nadesController.loadNades);
router.post("/loadUnverifiedNades", nadesController.loadUnverifiedNades);
router.post("/loadNadeVideo", nadesController.loadNadeVideo);
router.post("/getAuthorUserName", userController.getAuthorUserName);
router.post("/getAuthorUserNames", userController.getAuthorUserNames);

router.post(
  "/submitNade",
  nadesController.validateNade,
  nadesController.submitNade
);

router.post("/likeNadePost", nadesController.likeNadePost);
router.post("/dislikeNadePost", nadesController.dislikeNadePost);

app.use("/react-node", router);
app.set("port", process.env.PORT || 7777);
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "build", "index.html"));
});
const server = app.listen(app.get("port"), () => {
  console.log(`Server is running on Port: ${server.address().port}`);
});
