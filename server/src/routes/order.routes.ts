import express from "express";
import {
  getOrders,
  getOrdersComplete,
  getOrder,
  getOrderAndUser,
  getOrderAndItems,
  getOrderUserAndItems,
  createOrder,
  replaceOrder,
  updateOrder,
  deleteOrder,
} from "../controllers/order.controller";
const routers = express.Router();

// all routes of Branch (Create ,GETall, GETOne, Put, Patch, Delete)
export const OrderRouters = routers
  .post("/", createOrder)
  .get("/", getOrders)
  .get("/all/", getOrdersComplete)
  .get("/:id", getOrder)
  .get("/user/:id", getOrderAndUser)
  .get("/items/:id", getOrderAndItems)
  .get("/all/:id", getOrderUserAndItems)
  .put("/:id", replaceOrder)
  .patch("/:id", updateOrder)
  .delete("/:id", deleteOrder);
