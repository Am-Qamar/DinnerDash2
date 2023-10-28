import express from "express";
import {
  createUser,
  getAllUsers,
  getUser,
  replaceUser,
  updateUser,
  deleteUser,
  loginUser,
} from "../controllers/user.controller";
const routers = express.Router();

// all routes of Branch (Create ,GETall, GETOne, Put, Patch, Delete)
export const UserRouters = routers
  .post("/", createUser)
  .post("/login/", loginUser)
  .get("/", getAllUsers)
  .get("/:id", getUser)
  .put("/:id", replaceUser)
  .patch("/:id", updateUser)
  .delete("/:id", deleteUser);
