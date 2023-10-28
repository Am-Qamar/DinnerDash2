import express from "express";
import {
  getAllItems,
  getAllItemsComplete,
  getItem,
  getItemAndCategories,
  getItemAndRestaurants,
  getItemCateAndRest,
  createItem,
  replaceItem,
  updateItem,
  deleteItem,
} from "../controllers/item.controller";
const routers = express.Router();

// all routes of Branch (Create ,GETall, GETOne, Put, Patch, Delete)
export const ItemRouters = routers
  .post("/", createItem)
  .get("/", getAllItems)
  .get("/all/", getAllItemsComplete)
  .get("/:id", getItem)
  .get("/categories/:id", getItemAndCategories)
  .get("/Restaurants/:id", getItemAndRestaurants)
  .get("/all/:id", getItemCateAndRest)
  .put("/:id", replaceItem)
  .patch("/:id", updateItem)
  .delete("/:id", deleteItem);
