import { Request, Response } from "express";
import { User, UserDocument } from "../models/user.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function getAllUsers(req: Request, res: Response) {
  try {
    const users: UserDocument[] = await User.find({}).exec();

    // checking the returned data
    if (users.length === 0) {
      res.status(404).json({ error: "users not found" });
    }
    //sending status 200 correct if user return succeesfully
    res.status(200).json(users);
  } catch (error) {
    console.error("Error:", error);

    // Handle errors by responding with a 500 Internal Server Error
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function getUser(req: Request, res: Response) {
  try {
    const user: UserDocument | null = await User.findOne({
      _id: req.params.id,
    }).exec();

    // Checking the response
    if (!user) {
      res.status(200).json({ error: "user not found this id" });
    }

    //sending result 200 if succeesful
    res.status(200).json(user);
  } catch (error) {
    console.error("Error:", error);

    // Handle errors by responding with a 500 Internal Server Error
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function createUser(req: Request, res: Response) {
  try {
    const { name, email, dispName, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const newUser: UserDocument = new User({
      name,
      email,
      dispName,
      password,
    });

    const saveUser = await newUser.save();
    const token = jwt.sign({ userId: newUser._id }, "tamashau#5554", {
      expiresIn: "1h",
    });
    // sending response 201 if seccefully created
    res.status(201).json({ user: saveUser, token });
  } catch (error) {
    console.error("Error:", error);

    //validation error check
    if ((error as any).errors) {
      const validationErrors = Object.keys((error as any).errors).map(
        (field) => ({
          field,
          message: (error as any).errors[field].message,
        })
      );

      //send a bad request 400 with prpoper error massage if the given request is not valid
      res.status(400).json({ error: validationErrors });
    }

    // Handle errors by responding with a 500 Internal Server Error
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function loginUser(req: Request, res: Response) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).exec();

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    const token = jwt.sign({ userId: user._id }, "tamashau#5554", {
      expiresIn: "1h",
    });

    // Send the token in the response
    res.status(200).json({ userId: user._id, token });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function replaceUser(req: Request, res: Response) {
  try {
    const { name, email } = req.body;

    if (!name) {
      console.log("you cannot replace user without name.");
      res.status(400).json({ message: "Name is missing" });
    } else if (!email) {
      console.log("you cannot replace user without email.");
      res.status(400).json({ message: "Email is missing" });
    }
    const updateddata = User.findOneAndReplace(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    res.status(200).json({ message: "User has replaced with the given data." });
  } catch (error) {
    console.error("error");

    // Handle errors by responding with a 500 Internal Server Error
    res.status(500).json({ message: "Internal server error" });
  }
}
export async function updateUser(req: Request, res: Response) {
  try {
    const updateData = req.body;
    const updatedData = await User.findOneAndUpdate(
      { _id: req.params.id },
      updateData,
      { new: true }
    );

    if (!updatedData) {
      // send 404 in response if user not found
      res.status(404).json({ error: "user not found" });
    }

    //sending response 200 if succeeful
    res.status(200).json(updatedData);
  } catch (error) {
    console.error("error", error);

    // Handle errors by responding with a 500 Internal Server Error
    res.status(500).json({ message: "Internal server error" });
  }
}
export async function deleteUser(req: Request, res: Response) {
  try {
    const deletedUser = await User.findOneAndDelete({
      _id: req.params.id,
    });

    if (!deletedUser) {
      // send 404 in response if user not found
      res.status(404).json({ error: "user not found" });
    }

    //sending response 200 if succeeful
    res.status(200).json(deletedUser);
  } catch (error) {
    console.error("error");

    // Handle errors by responding with a 500 Internal Server Error
    res.status(500).json({ message: "Internal server error" });
  }
}
/** export {
  getAllUsers,
  getUser,
  createUser,
  replaceUser,
  updateUser,
  deleteUser,
};
*/
