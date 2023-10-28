import express from "express";
import {
  getAllCategories,
  getAllCategoriesComplate,
  getCategory,
  getCategoryAndItems,
  getCategoryAndRestaurants,
  getCategoryItemAndRest,
  createCategory,
  replaceCategory,
  updateCategory,
  deleteCategory,
} from "../controllers/category.controller";
const routers = express.Router();

// all routes of Branch (Create ,GETall, GETOne, Put, Patch, Delete)
export const CategoryRouters = routers
  .post("/", createCategory)
  .get("/", getAllCategories)
  .get("/all/", getAllCategoriesComplate)
  .get("/:id", getCategory)
  .get("/items/:id", getCategoryAndItems)
  .get("/restaurant/:id", getCategoryAndRestaurants)
  .get("/all/:id", getCategoryItemAndRest)
  .get("/:id", getCategory)
  .get("/:id", getCategory)
  .put("/:id", replaceCategory)
  .patch("/:id", updateCategory)
  .delete("/:id", deleteCategory);
