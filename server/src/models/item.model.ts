// src/models/item.model.ts
import { Document, Schema, Model, model } from "mongoose";

export interface ItemDocument extends Document {
  title: string;
  description: string;
  price: number;
  quantity: number;
  photo?: string;
  categories: Schema.Types.ObjectId[];
  restaurantIDs: Schema.Types.ObjectId[];
  status: string;
}
function validatePrice(value: number) {
  if (value <= 0) {
    throw new Error("Price must be greater than 0.");
  }
}
function validateQuantity(value: number) {
  if (value <= 0) {
    throw new Error("Quantity must be greater than 0.");
  }
}

// Create a Mongoose schema for the ItemDocument model
const itemSchema = new Schema<ItemDocument>({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0.01, // Minimum price
    validate: [validatePrice, "Price validation failed"],
  },
  quantity: {
    type: Number,
    required: true,
    validate: [validateQuantity, "Quantity validation failed"],
  },
  photo: String,
  categories: [
    {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
  ],
  restaurantIDs: [
    {
      type: Schema.Types.ObjectId,
      ref: "Restaurant",
    },
  ],
  status: {
    type: String,
    required: true,
  },
});

export const Item: Model<ItemDocument> = model<ItemDocument>(
  "ItemDocument",
  itemSchema
);
