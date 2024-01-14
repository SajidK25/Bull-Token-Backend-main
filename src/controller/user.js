require("dotenv").config();
const User = require("../models/userModel");
const express = require("express");
const app = express();
const bcrypt = require("bcryptjs");
app.use(express.json());
const jwt = require("jsonwebtoken");
const { redis_v1 } = require("googleapis");
const { use } = require("passport");
const secretKey = process.env.SECRET_KEY;

//Get All Users
const GetAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).sort({ coins: -1 });
    res.status(200).json({ users });
  } catch (e) {
    res.status(400).json({ message: e });
  }
};

//Get User By ID
const GetUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id);
    res.json(user);
  } catch (e) {
    res.json({ message: e });
  }
};

// Get User By Referral Code
const GetUserByReferalCode = async (req, res) => {
  try {
    const id = req.params.id;
    const users = await User.find({ referalId: id });

    if (users.length > 0) {
      res.status(200).json({ user: users[0] });
    } else {
      res.status(404).json({ message: "No Referral Id Found" });
    }
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

const GetUserByKey = async (req, res) => {
  try {
    const id = req.params.id;
    const users = await User.find({ key: id });

    if (users.length > 0) {
      res.status(200).json({ user: users[0] });
    } else {
      res.status(404).json({ message: "No Backup key Found" });
    }
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

//Update User Id
const UpdateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findOneAndUpdate({ _id: id }, req.body, {
      new: true,
    });

    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "User Not Found" });
    }
  } catch (e) {
    res.status(500).json(e);
  }
};
const UpdatePassword = async (req, res) => {
  try {
    const { id } = req.params;
    const { password } = req.body;

    if (!password) {
      return res.status(400).json({ message: "New password is required" });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const user = await User.findOneAndUpdate(
      { _id: id },
      { password: hashedPassword },
      {
        new: true,
      }
    );

    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "User Not Found" });
    }
  } catch (e) {
    res.status(500).json(e);
  }
};

module.exports = {
  UpdatePassword,
  GetUserByKey,
  UpdateUser,
  GetUserByReferalCode,
  GetAllUsers,
  GetUserById,
};
