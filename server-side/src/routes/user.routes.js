const express = require("express");
const router = express.Router();
const {
  isSignedIn,
  isAuthenticated,
} = require("../controllers/auth.controller");

const { getuserById, getUser } = require("../controllers/user.controller");

router.param("userId", getuserById);

//Export
module.exports = router;
