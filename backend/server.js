const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const promisify = require("es6-promisify");
const routes = express.Router();

const PORT = 4000;

let User = require("./models/Users");

app.use(cors());
app.use(bodyParser.json());

mongoose.connect("mongodb://127.0.0.1:27017/react-node", {
  useNewUrlParser: true
});
const connection = mongoose.connection;

connection.once("open", function() {
  console.log("MongoDB connection established successfully.");
});

routes.route("/users").get(function(req, res) {
  User.find(function(err, users) {
    if (err) {
      console.log(err);
    } else {
      res.json(users);
    }
  });
});

routes.route("/register").post = async (req, res) => {
  let user = new User({ email: req.body.email, name: req.body.name });
  console.log(user);
  const register = promisify(User.register, User);
  await register(user, req.body.password);
  user
    .save()
    .then(user => {
      res.status(200).json({ user: "Registration successful" });
    })
    .catch(err => {
      res.status(400).send(`Registration failed - ${err.message}`);
    });
};

app.use("/react-node", routes);

app.listen(PORT, function() {
  console.log(`Server is running on Port: ${PORT}`);
});
