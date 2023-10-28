import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
const cors = require("cors");
import { UserRouters } from "./routes/user.routes";
import { ItemRouters } from "./routes/item.routes";
import { OrderRouters } from "./routes/order.routes";
import { CategoryRouters } from "./routes/category.routes";
import { RestaurantRouters } from "./routes/restaurant.routes";

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Define the port to listen
const port = process.env.PORT || 9000;

// Connecting to mongoose
mongoose
  .connect("mongodb://127.0.0.1:27017/Dinner")
  .then(() => {
    console.log("Connected to MongoDB on localhost");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

app.use("/user", UserRouters);
app.use("/items", ItemRouters);
app.use("/order", OrderRouters);
app.use("/category", CategoryRouters);
app.use("/restaurant", RestaurantRouters);

// Listening to the Port
app.listen(port, () => {
  console.log("Server is running");
});

export default app;
