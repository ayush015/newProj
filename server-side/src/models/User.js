//Imports
const { Schema, model } = require("mongoose");
const { v4: uuidv4 } = require("uuid");
const crypto = require("crypto");

//User Schema
const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
    },
    // for Oauth2.0 in progress
    authProvider: String,
    providerId: String,
    email: {
      type: String,
      required: true,
      unique: true,
    },
    encrypt_password: {
      type: String,
      // required: true,
    },
    salt: String,
  },
  {
    timestamps: true,
  }
);

userSchema
  .virtual("password")
  .set(function (password) {
    this._password = password;
    this.salt = uuidv4();
    this.encrypt_password = this.securePassword(password);
  })
  .get(function () {
    return this._password;
  });

userSchema.methods = {
  authenticate: function (plainPassword) {
    return this.securePassword(plainPassword) === this.encrypt_password;
  },

  securePassword: function (plainPassword) {
    if (!plainPassword) {
      return "";
    }
    try {
      return crypto
        .createHmac("sha256", this.salt)
        .update(plainPassword)
        .digest("hex");
    } catch (err) {
      return "";
    }
  },
};

module.exports = model("User", userSchema);
