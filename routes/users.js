import express from "express";
import User from "../models/User";

const userRouter = express.Router();

// route to login user
userRouter.post("/login", async (req, res) => {
  console.log(req.body);
  try {
    let user = await User.findOne({
      email: req.body.email,
      password: req.body.password,
    });
    if (user) {
      res.status(200).json({
        status: 200,
        data: user,
      });
    } else {
      res.status(400).json({
        status: 400,
        message: "No user found OR Invalid credentials",
      });
    }
  } catch (err) {
    alert("Error logging in");
    res.status(400).json({
      status: 400,
      message: err.message,
    });
  }
});

// Route to create a new user
userRouter.post("/", async (req, res) => {
  try {
    let user = new User(req.body);
    user = await user.save();

    res.status(200).json({
      status: 200,
      data: user,
    });
  } catch (err) {
    alert("Error creating user");
    res.status(400).json({
      status: 400,
      message: err.message,
    });
  }
});

// Route to get all users
userRouter.get("/", async (req, res) => {
  try {
    let users = await User.find();
    res.status(200).json({
      status: 200,
      data: users,
    });
  } catch (err) {
    alert("Error getting users");
    res.status(400).json({
      status: 400,
      message: err.message,
    });
  }
});

userRouter.get("/:userID", async (req, res) => {
  try {
    let user = await User.findOne({
      _id: req.params.userID,
    });
    if (user) {
      res.status(200).json({
        status: 200,
        data: user,
      });
    }
    res.status(400).json({
      status: 400,
      message: "No user found",
    });
  } catch (err) {
    alert("Error getting user");
    res.status(400).json({
      status: 400,
      message: err.message,
    });
  }
});

userRouter.put("/:userID", async (req, res) => {
  try {
    let user = await User.findByIdAndUpdate(req.params.userID, req.body, {
      new: true,
    });
    if (user) {
      res.status(200).json({
        status: 200,
        data: user,
      });
    }
    res.status(400).json({
      status: 400,
      message: "No user found",
    });
  } catch (err) {
    alert("Error updating user");
    res.status(400).json({
      status: 400,
      message: err.message,
    });
  }
});

userRouter.delete("/:userID", async (req, res) => {
  try {
    let user = await User.findByIdAndRemove(req.params.userID);
    if (user) {
      res.status(200).json({
        status: 200,
        message: "user deleted successfully",
      });
    } else {
      res.status(400).json({
        status: 400,
        message: "No user found",
      });
    }
  } catch (err) {
    alert("Error deleting user");
    res.status(400).json({
      status: 400,
      message: err.message,
    });
  }
});

export default userRouter;
