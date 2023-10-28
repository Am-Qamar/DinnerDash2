import { Document, Schema, Model, model } from "mongoose";
import bcrypt from "bcrypt";
import validator from "validator";

// Define the interface for the User document
export interface UserDocument extends Document {
  name: string;
  email: string;
  dispName: string;
  password: String;
}

// Create a Mongoose schema for the User model
const userSchema = new Schema<UserDocument>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (value: string) => validator.isEmail(value),
      message: "Invalid email address",
    },
  },
  dispName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

/** this is the ethod that will automatically make the hash
 * when the new user will be created and also make the hash
 * when the passowrd wil be updated */
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const saltRounds = 10;
    try {
      const hashedPassword = await bcrypt.hash(this.password, saltRounds);
      this.password = hashedPassword;
      next();
    } catch (error) {
      next(error as any);
    }
  } else {
    next();
  }
});

export const User: Model<UserDocument> = model<UserDocument>(
  "User",
  userSchema
);
