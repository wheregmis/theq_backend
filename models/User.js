import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  type: String,
  image: String,
});

const User = mongoose.model("User", userSchema);

export default User;
