require("dotenv").config();
const User = require("../models/userModel");
const express = require("express");
const app = express();
const bcrypt = require("bcryptjs");
app.use(express.json());
const jwt = require("jsonwebtoken");
const secretKey = process.env.SECRET_KEY;

//SignUp User
const CreateUser = async (req, res) => {
  const password = bcrypt.hashSync(req?.body?.password);
  const user = new User({
    ...req.body,
    password,
    referalId: generateRandomCode(15),
    key: generatekey(12),
  });
  await user
    .save()
    .then(() => {
      res.status(200).json({ message: "User Created Success", user });
    })
    .catch((e) => {
      res.status(400).json({ message: "User Already Registered" });
    });
};

//Login User
const LoginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.find({ email: email });
    const data = user[0];
    if (!data) {
      res.status(400).json({ message: "User Not Found" });
      return;
    }
    const token = jwt.sign({ email: data.email }, secretKey, {
      expiresIn: "1y",
    });
    const matched = bcrypt.compareSync(password, data.password);
    console.log(matched);
    if (!matched) {
      res.status(400).json({ message: "wrong email or password" });
      return;
    }

    res.status("200").send({ user, token, message: "Sign In Successfull" });
  } catch (e) {
    res.status(400).json({ message: e });
  }
};

function generateRandomCode(length) {
  const characters = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let code = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    code += characters.charAt(randomIndex);
  }
  return code;
}
function generatekey(length) {
  const characters =
    "0123456789ABCDEFGHIJKLM34567ASDFGHKLWRTYUIONOPQRSTUVWXYZ704938509348508509809573409750348";
  let code = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    code += characters.charAt(randomIndex);
  }
  return code;
}

module.exports = {
  CreateUser,
  LoginUser,
};
