import { Document, Schema, Model, model } from "mongoose";

export interface OrderDocument extends Document {
  userId: Schema.Types.ObjectId;
  itemIds: Schema.Types.ObjectId[];
  quantity: number;
  sublineTotal: number;
  total: number;
  status: string;
  subTime: Date;
  actTime?: Date | null;
}

const orderSchema = new Schema<OrderDocument>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  itemIds: [
    {
      type: Schema.Types.ObjectId,
      ref: "Item",
      required: true,
    },
  ],
  quantity: {
    type: Number,
    required: true,
  },
  sublineTotal: {
    type: Number,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  subTime: {
    type: Date,
    //required: true,
    default: null,
  },
  actTime: {
    type: Date,
    default: null,
  },
});

export const Order: Model<OrderDocument> = model<OrderDocument>(
  "Order",
  orderSchema
);
