const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const { promisify } = require("es6-promisify");
const router = express.Router();
require("./models/User");
const userController = require("./controllers/userController");
const PORT = 4000;
const User = require("./models/User");
const expressValidator = require("express-validator");

app.use(cors());
app.use(bodyParser.json());
app.use(expressValidator());

mongoose.connect("mongodb://127.0.0.1:27017/react-node", {
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

app.listen(PORT, function() {
  console.log(`Server is running on Port: ${PORT}`);
});
