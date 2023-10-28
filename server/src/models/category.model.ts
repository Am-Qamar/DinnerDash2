import { Document, Schema, Model, model } from "mongoose";

// Define the interface for the Category document
export interface CategoryDocument extends Document {
  name: string;
  itemIds?: Schema.Types.ObjectId[] | null; // Optional array of references to Item model
  restaurantIds?: Schema.Types.ObjectId[] | null; // Optional array of references to Restaurant model
}

// Create a Mongoose schema for the Category model
const categorySchema = new Schema<CategoryDocument>({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  itemIds: [
    {
      type: Schema.Types.ObjectId,
      ref: "Item",
    },
  ],
  restaurantIds: [
    {
      type: Schema.Types.ObjectId,
      ref: "Restaurant",
    },
  ],
});

// Create the Category model
export const Category: Model<CategoryDocument> = model<CategoryDocument>(
  "Category",
  categorySchema
);
