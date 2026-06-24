const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { UserModel } = require("../model/UserModel");
const BlacklistModel = require("../model/BlacklistModel");
const { Validate_User } = require("../middleware/authMiddleware");

router.post("/register", async (req, res) => {
  try {
    let { name, username, email, password } = req.body;
    if (!name || !username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    const isUseralreadyregister = await UserModel.findOne({
      $or: [{ username }, { email }],
    });
    if (isUseralreadyregister) {
      return res.status(400).json({
        message:
          "There is some one already register with this username or email",
      });
    }
    const hash = await bcrypt.hash(password, 10);
    const user = new UserModel({
      name,
      username,
      email,
      password: hash,
    });
    await user.save();
    const token = jwt.sign(
      {
        id: user._id,
        username: user.username,
        name: user.name,
      },
      process.env.JWT,
      {
        expiresIn: "1d",
      },
    );
    res.cookie("token", token);
    return res.status(201).json({
      message: "User Created Successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server Error",
    });
    console.log("Error (In Register Part):", error);
  }
});

router.post("/login", async (req, res) => {
  try {
    let { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }
    const user = await UserModel.findOne({ username });
    if (!user) {
      return res.status(400).json({
        message: "Invalid Username or Password!!",
      });
    }
    const IsValidPassword = await bcrypt.compare(password, user.password);
    if (!IsValidPassword) {
      res.status(400).json({
        message: "Invalid Username or Password!!",
      });
    }
    const token = jwt.sign(
      {
        id: user._id,
        username: user.username,
        name: user.name,
      },
      process.env.JWT,
      {
        expiresIn: "1d",
      },
    );
    res.cookie("token", token);
    return res.status(200).json({
      message: "User Logged In Successfully",
      user: {
        name: user.name,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
    });
    console.log("Error (In logged Part):", error);
  }
});

router.get("/logout", async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(400).json({
        message: "Token Empty",
      });
    }

    let newBlacklisttoken = new BlacklistModel({ token });
    await newBlacklisttoken.save();

    res.clearCookie("token");

    return res.status(200).json({
      message: "Logged Out Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error form catch",
    });
  }
});

router.get("/get_me", Validate_User, async (req, res) => {
  try {
    const user = await UserModel.findById(req.user.id);
    res.status(200).json({
      message: "Fetch User Data is Successfully",
      user: {
        id: user._id,
        name: user.name,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error " });
  }
});
module.exports = router;
