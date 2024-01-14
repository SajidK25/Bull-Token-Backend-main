require("dotenv").config();
const EventModel = require("../models/eventModel");
const ScreenModel = require("../models/screensModel");
const User = require("../models/userModel");
const express = require("express");
const app = express();
app.use(express.json());

//Find User By Referral Token
const GetAllScreens = async (req, res) => {
  try {
    const event = await ScreenModel.find({}).sort();
    res.status(200).json({ event });
  } catch (e) {
    res.status(400).json({ message: e });
  }
};

module.exports = {
  GetAllScreens,
};
