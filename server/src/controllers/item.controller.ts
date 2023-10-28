import { Request, Response } from "express";
import { Item, ItemDocument } from "../models/item.model";
import { Category } from "../models/category.model";
import { Restaurant } from "../models/restaurant.model";

export async function getAllItems(req: Request, res: Response) {
  try {
    const items: ItemDocument[] = await Item.find({}).exec();

    // checking the returned data
    if (items.length === 0) {
      res.status(404).json({ error: "Items not found" });
    }

    //sending status 200 correct if item return succeesfully
    res.status(200).json(items);
  } catch (error) {
    console.error("Error:", error);

    // Handle errors by responding with a 500 Internal Server Error
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function getAllItemsComplete(req: Request, res: Response) {
  try {
    const items: ItemDocument[] = await Item.find({})
      .populate("categories")
      .populate("restaurantIDs")
      .exec();

    // checking the returned data
    if (items.length === 0) {
      res.status(404).json({ error: "Items not found" });
    }

    //sending status 200 correct if item return succeesfully
    res.status(200).json(items);
  } catch (error) {
    console.error("Error:", error);

    // Handle errors by responding with a 500 Internal Server Error
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function getItem(req: Request, res: Response) {
  try {
    const item: ItemDocument | null = await Item.findOne({
      _id: req.params.id,
    }).exec();

    // Checking the response
    if (!item) {
      res.status(200).json({ error: "item not found this id" });
    }

    //sending result 200 if succeesful
    res.status(200).json(item);
  } catch (error) {
    console.error("Error:", error);

    // Handle errors by responding with a 500 Internal Server Error
    res.status(500).json({ error: "Internal Server Error" });
  }
}
export async function getItemAndCategories(req: Request, res: Response) {
  try {
    const item: ItemDocument | null = await Item.findOne({
      _id: req.params.id,
    })
      .populate("categories")
      .exec();

    // Checking the response
    if (!item) {
      res.status(200).json({ error: "item not found this id" });
    }

    //sending result 200 if succeesful
    res.status(200).json(item);
  } catch (error) {
    console.error("Error:", error);

    // Handle errors by responding with a 500 Internal Server Error
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function getItemAndRestaurants(req: Request, res: Response) {
  try {
    const item: ItemDocument | null = await Item.findOne({
      _id: req.params.id,
    })
      .populate("restaurantIDs")
      .exec();

    // Checking the response
    if (!item) {
      res.status(200).json({ error: "item not found this id" });
    }

    //sending result 200 if succeesful
    res.status(200).json(item);
  } catch (error) {
    console.error("Error:", error);

    // Handle errors by responding with a 500 Internal Server Error
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function getItemCateAndRest(req: Request, res: Response) {
  try {
    const item: ItemDocument | null = await Item.findOne({
      _id: req.params.id,
    })
      .populate("categories")
      .populate("restaurantIDs")
      .exec();

    // Checking the response
    if (!item) {
      res.status(200).json({ error: "item not found this id" });
    }

    //sending result 200 if succeesful
    res.status(200).json(item);
  } catch (error) {
    console.error("Error:", error);

    // Handle errors by responding with a 500 Internal Server Error
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function createItem(req: Request, res: Response) {
  try {
    const newItem: ItemDocument = new Item({
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      quantity: req.body.quantity,
      photo: req.body.photo,
      categories: req.body.categories,
      restaurantIDs: req.body.restaurantIDs,
      status: req.body.status,
    });
    const reqCategories = req.body.categories;
    const reqRestaurant = req.body.restaurantIDs;

    if (reqCategories.length === 0) {
      res.status(400).json({ message: "at least One category required " });
    }

    /** we are not validating because when the save method will be 
    called mongoose will automatically apply the validation of 
    all fields that we have set in the mongoose model **/
    const saveItem = await newItem.save();
    if (saveItem) {
      /**Update the Category and Restaurant model */
      if (reqCategories) {
        await Category.updateMany(
          { _id: { $in: reqCategories } },
          { $addToSet: { itemIds: newItem._id } }
        );
      }
      if (reqRestaurant) {
        await Restaurant.updateMany(
          { _id: { $in: reqRestaurant } },
          { $addToSet: { itemId: newItem._id } }
        );
      }
    }

    // sending response 201 if seccefully created
    res.status(201).json(saveItem);
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

export async function replaceItem(req: Request, res: Response) {
  try {
    const replacementData = {
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      quantity: req.body.quantity,
      photo: req.body.photo,
      categories: req.body.categories,
      restaurantIDs: req.body.restaurantIDs,
      status: req.body.status,
    };
    if (!replacementData.title) {
      res.status(400).json({ message: "cannot replace without title." });
    } else if (!replacementData.description) {
      res.status(400).json({ message: "cannot replace without discripton." });
    } else if (!replacementData.price) {
      res.status(400).json({ message: "cannot replace without price." });
    } else if (!replacementData.quantity) {
      res.status(400).json({ message: "cannot replace without Quantity." });
    } else if (!replacementData.categories) {
      res.status(400).json({
        message:
          "cannot replace without category. at least one categoruy is given.",
      });
    } else if (!replacementData.status) {
      res.status(400).json({ message: "cannot replace without staus." });
    }
    const replace = Item.findOneAndReplace(
      { _id: req.params.id },
      replacementData,
      { new: true }
    );
    res.status(200).json({ message: "item repalce with the given data" });
  } catch (error) {
    console.error("error");

    // Handle errors by responding with a 500 Internal Server Error
    res.status(500).json({ message: "Internal server error" });
  }
}
export async function updateItem(req: Request, res: Response) {
  try {
    const updateData = req.body;
    const updatedData = await Item.findOneAndUpdate(
      { _id: req.params.id },
      updateData,
      { new: true }
    );

    if (!updatedData) {
      // send 404 in response if item not found
      res.status(404).json({ error: "Item not found" });
    }
    const reqCategories = req.body.categories;
    const reqRestaurant = req.body.restaurantIDs;
    if (reqCategories) {
      await Category.updateMany(
        { _id: { $in: reqCategories } },
        { $addToSet: { itemIds: req.params.id } }
      );
    }
    if (reqRestaurant) {
      await Restaurant.updateMany(
        { _id: { $in: reqRestaurant } },
        { $addToSet: { itemId: req.params.id } }
      );
    }

    //sending response 200 if succeeful
    res.status(200).json(updatedData);
  } catch (error) {
    console.error("error", error);

    // Handle errors by responding with a 500 Internal Server Error
    res.status(500).json({ message: "Internal server error" });
  }
}
export async function deleteItem(req: Request, res: Response) {
  try {
    const deletedItem = await Item.findOneAndDelete({ _id: req.params.id });

    if (!deletedItem) {
      // send 404 in response if item not found
      res.status(404).json({ error: "Item not found" });
    }

    const categoryIds = deletedItem?.categories;
    const restaurantIds = deletedItem?.restaurantIDs;

    await Category.updateMany(
      { _id: { $in: categoryIds } },
      { $pull: { itemIds: deletedItem?._id } }
    );

    await Restaurant.updateMany(
      { _id: { $in: restaurantIds } },
      { $pull: { itemId: deletedItem?._id } }
    );
    //sending response 200 if succeeful
    res.status(200).json(deletedItem);
  } catch (error) {
    console.error("error");

    // Handle errors by responding with a 500 Internal Server Error
    res.status(500).json({ message: "Internal server error" });
  }
}
/**export {
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
}; */
