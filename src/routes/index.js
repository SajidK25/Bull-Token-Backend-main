const express = require("express");
const Router = express.Router();

const { CreateUser, LoginUser } = require("../controller/auth");
const {
  GetUserById,
  GetAllUsers,
  GetUserByReferalCode,
  UpdateUser,
  GetUserByKey,
  UpdatePassword,
} = require("../controller/user");
const { GetAllEvents } = require("../controller/events");
const { GetAllScreens } = require("../controller/screens");
const { GetAllAdds, StartMining } = require("../controller/adds");
Router.route("/GetAllEvents").get(GetAllEvents);
Router.route("/GetAllUsers").get(GetAllUsers);
Router.route("/GetAllScreens").get(GetAllScreens);
Router.route("/GetAllAdds").get(GetAllAdds);
Router.route("/Register").post(CreateUser);
Router.route("/Login").post(LoginUser);
Router.route("/StartMining/:id").put(StartMining);
Router.route("/GetUserById/:id").get(GetUserById);
Router.route("/GetUserByKey/:id").get(GetUserByKey);
Router.route("/GetUsersByReferalCode/:id").get(GetUserByReferalCode);
Router.route("/UpdateUserById/:id").post(UpdateUser);
Router.route("/UpdatePasswordByKey/:id").post(UpdatePassword);

module.exports = Router;
