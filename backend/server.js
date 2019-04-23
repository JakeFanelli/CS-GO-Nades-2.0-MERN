const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const { promisify } = require("es6-promisify");
const router = express.Router();
require("./models/User");
const userController = require("./controllers/userController");
const User = require("./models/User");
const expressValidator = require("express-validator");
require("dotenv").config({ path: "variables.env" });

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

router.route("/users").get(function(req, res) {
  User.find(function(err, users) {
    if (err) {
      console.log(err);
    } else {
      res.json(users);
    }
  });
});

router.post(
  "/register",
  userController.validateRegister,
  userController.register
);

app.use("/react-node", router);
app.set("port", process.env.PORT || 7777);
const server = app.listen(app.get("port"), () => {
  console.log(`Server is running on Port: ${server.address().port}`);
});
