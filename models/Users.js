const { Schema, model } = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: [true, "Please Enter an Username"],
  },
  email: {
    type: String,
    required: [true, "Please Enter an Email"],
    unique: true,
    validate: [isEmail, "Please Enter A Valid Email Address"],
  },
  password: {
    type: String,
    required: [true, "please Enter Password"],
    minlength: [6, "Password must be at least 6 characters long"],
  },
});

//@ Hashing Password
userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

//@ Creating a Static Method to login user.
userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw new Error("Incorrect Password");
  } else {
    throw Error("Incorrect Email");
  }
};

//@ Unique Validator Plugin-
userSchema.plugin(uniqueValidator, { message: "{PATH} must be unique" });

module.exports = model("User", userSchema);
