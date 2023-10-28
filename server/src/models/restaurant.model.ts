import { Schema, Document, Model, model } from "mongoose";

export interface RestaurantDocument extends Document {
  name: String;
  discription: string;
  categoryId?: Schema.Types.ObjectId[] | null;
  itemId?: Schema.Types.ObjectId[] | null;
}
const restaurantSchema = new Schema<RestaurantDocument>({
  name: {
    type: String,
    unique: true,
    require: true,
  },
  discription: {
    type: String,
  },
  categoryId: [
    {
      type: Schema.Types.ObjectId,
      ref: "Category",
    },
  ],
  itemId: [
    {
      type: Schema.Types.ObjectId,
      ref: "Item",
    },
  ],
});

export const Restaurant: Model<RestaurantDocument> = model<RestaurantDocument>(
  "Restaurant",
  restaurantSchema
);
