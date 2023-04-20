import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  aliasName: String,
  aboutYou: String,
  email: String,
  password: String,
  type: String,
  image: String,
  organization: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Organization",
  },
});

const User = mongoose.model("User", userSchema);

export default User;
