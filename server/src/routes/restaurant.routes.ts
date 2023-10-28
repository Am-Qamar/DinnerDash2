import express from "express";
import {
  getRestaurants,
  getRestaurantsComplete,
  getRestaurant,
  getRestaurantAndCategories,
  getRestaurantAndItems,
  getRestaurantCateAndItems,
  createRestaurant,
  replaceRestaurant,
  updateRestaurant,
  deleteRestaurant,
} from "../controllers/restaurant.controller";
const routers = express.Router();

// all routes of Branch (Create ,GETall, GETOne, Put, Patch, Delete)
export const RestaurantRouters = routers
  .post("/", createRestaurant)
  .get("/", getRestaurants)
  .get("/all/", getRestaurantsComplete)
  .get("/:id", getRestaurant)
  .get("/categories/:id", getRestaurantAndCategories)
  .get("/items/:id", getRestaurantAndItems)
  .get("/all/:id", getRestaurantCateAndItems)
  .put("/:id", replaceRestaurant)
  .patch("/:id", updateRestaurant)
  .delete("/:id", deleteRestaurant);
