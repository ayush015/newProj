//Imports
// const User = require("../models/User");

// //Variable
// const authCtrl = {};

// //Register user endpoint

// authCtrl.registerUser = async (req, res) => {
//   console.log(req.body);
//   const newUser = new User(req.body);

//   try {
//     newUser.password = await newUser.encryptPassword(newUser.password);
//     await newUser.save();
//     res.status(201).send({ created: true });
//   } catch (error) {
//     res.status(400).send({ error });
//   }
// };

// //Login user endpoint
// authCtrl.loginUser = async (req, res) => {
//   const { email, password } = req.body;
//   console.log(req.body);
//   try {
//     const user = await User.findByCredentials(email, password);
//     console.log(user);
//     const token = await user.generateAuthToken();
//     console.log(token);
//     res.status(200).send({ token });
//   } catch (error) {
//     res.status(400).json({ error: "id password does not match" });
//   }
// };

//Export router
// module.exports = authCtrl;

const User = require("../models/User");
const { check, validationResult } = require("express-validator");
var jwt = require("jsonwebtoken");
var expressJwt = require("express-jwt");

const secret = "ILoveToHideStuff";

exports.signup = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
    });
  }

  const user = new User(req.body);
  user.save((err, user) => {
    if (err) {
      console.log(err);
      return res.status(400).json({
        err: "Not able to save user in db",
      });
    }
    res.json(user);
  });
};

exports.signin = (req, res) => {
  const { email, password } = req.body;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
    });
  }

  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "This Email does not Exist",
      });
    }
    console.log(user.authenticate(password));
    if (!user.authenticate(password)) {
      return res.status(401).json({
        error: "Email and passowrd does not match",
      });
    }
    // Token being created

    const token = jwt.sign({ _id: user._id }, secret);

    // putting token in cookies

    res.cookie("token", token, { expire: new Date() + 999 });

    const { _id, name, lastname, email } = user;

    return res.json({
      token,
      user: { _id, name, lastname, email },
    });
  });
};

exports.signout = (req, res) => {
  res.clearCookie("token");
  res.json([
    {
      message: "User signed Out successfully",
    },
  ]);
};

exports.isSignedIn = expressJwt({
  secret: secret,
  algorithms: ["HS256"],
  userProperty: "auth",
});

exports.isAuthenticated = (req, res, next) => {
  let checker = req.profile && req.auth && req.profile._id == req.auth._id;
  if (!checker) {
    return res.status(403).json({
      error: "ACCESS DENIED",
    });
  }
  next();
};
