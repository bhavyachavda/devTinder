const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 4,
      maxLength: 50,
    },
    lastName: {
      type: String,
    },
    emailId: {
      type: String,
      lowercase: true,
      required: true,
      unique: true,
      trim: true,
      validate(value){
        if(!validator.isEmail(value)){
            throw new Error("Invalid email address " + value);
        }
      }
    },
    password: {
      type: String,
      required: true,
      validate(value){
        if(!validator.isStrongPassword(value)){
            throw new Error("Enter a Strong Password " + value);
        }
      }
    },
    age: {
      type: Number,
      min: 18,
    },
    gender: {
      type: String,
      // enum:{
      //   value: ["male","female","other"],
      //   message: `{VALUE} is not a valid gender type`, 
      // },
      validate(value) {
        if (!["male", "female", "other"].includes(value)) {
          throw new Error("Gender data is not valid");
        }
      },
    },
    photoUrl: {
      type: String,
      default:"https://smsdelhibmw.co.in/wp-content/uploads/2022/02/User-Profile-PNG.png",
      validate(value){
        if(!validator.isURL(value)){
            throw new Error("Invalid Photo URL: " + value);
        }
      }
    },
    about: {
      type: String,
      default: "This is a default about of the user!",
    },
    skills: {
      type: [String],
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.getJWT = async function (){
  const user = this;

  const token = await jwt.sign({ _id: user._id}, "DEV@Tinder$2210", {
    expiresIn: "7d"
  })

  return token;
}

userSchema.methods.validatePassword = async function (passwordInputByUser){
  const user = this;

  const isPasswordValid = await bcrypt.compare(passwordInputByUser, user.password);

  return isPasswordValid;
}

module.exports = mongoose.model("User", userSchema);
