const mongoose = require("mongoose");

const { Schema } = mongoose;

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 20,
  },
  lastName: {   // ✅ lowercase naming convention
    type: String,
    minLength: 3,
    maxLength: 20,
  },
  emailId: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true, // ✅ keep only this
    immutable: true,
  },
  age: {
    type: Number,
    min: 15,
    max: 80,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  problemSolved: {
    type: Number,
    default: 0,
  },
  password:{
    type:String,
    required:true,
  }
}, { timestamps: true }); // ✅ moved here

const User = mongoose.model("User", userSchema);
module.exports = User;
