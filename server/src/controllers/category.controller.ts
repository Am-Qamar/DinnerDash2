import { Request, Response } from "express";
import { Category, CategoryDocument } from "../models/category.model";
import { Item } from "../models/item.model";
import { Restaurant } from "../models/restaurant.model";

// Return all categories
export async function getAllCategories(req: Request, res: Response) {
  try {
    const categories: CategoryDocument[] = await Category.find({}).exec();

    // checking the returned data
    if (categories.length === 0) {
      res.status(404).json({ error: "categories not found" });
    }
    //sending status 200 correct if category return succeesfully
    res.status(200).json(categories);
  } catch (error) {
    console.error("Error:", error);

    // Handle errors by responding with a 500 Internal Server Error
    res.status(500).json({ error: "Internal Server Error" });
  }
}

/**Return all categories with the associated
 * items and Restaurants*/
export async function getAllCategoriesComplate(req: Request, res: Response) {
  try {
    const categories: CategoryDocument[] = await Category.find({})
      .populate("itemIds")
      .populate("restaurantIds")
      .exec();

    // checking the returned data
    if (categories.length === 0) {
      res.status(404).json({ error: "categories not found" });
    }
    //sending status 200 correct if category return succeesfully
    res.status(200).json(categories);
  } catch (error) {
    console.error("Error:", error);

    // Handle errors by responding with a 500 Internal Server Error
    res.status(500).json({ error: "Internal Server Error" });
  }
}

//Return One category
export async function getCategory(req: Request, res: Response) {
  try {
    const category: CategoryDocument | null = await Category.findOne({
      _id: req.params.id,
    }).exec();

    // Checking the response
    if (!category) {
      res.status(200).json({ error: "category not found this id" });
    }

    //sending result 200 if succeesful
    res.status(200).json(category);
  } catch (error) {
    console.error("Error:", error);

    // Handle errors by responding with a 500 Internal Server Error
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function getCategoryAndItems(req: Request, res: Response) {
  try {
    const category: CategoryDocument | null = await Category.findOne({
      _id: req.params.id,
    })
      .populate("itemIds")
      .exec();

    // Checking the response
    if (!category) {
      res.status(200).json({ error: "category not found this id" });
    }

    //sending result 200 if succeesful
    res.status(200).json(category);
  } catch (error) {
    console.error("Error:", error);

    // Handle errors by responding with a 500 Internal Server Error
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function getCategoryAndRestaurants(req: Request, res: Response) {
  try {
    const category: CategoryDocument | null = await Category.findOne({
      _id: req.params.id,
    })
      .populate("restaurantIds")
      .exec();

    // Checking the response
    if (!category) {
      res.status(200).json({ error: "category not found this id" });
    }

    //sending result 200 if succeesful
    res.status(200).json(category);
  } catch (error) {
    console.error("Error:", error);

    // Handle errors by responding with a 500 Internal Server Error
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function getCategoryItemAndRest(req: Request, res: Response) {
  try {
    const category: CategoryDocument | null = await Category.findOne({
      _id: req.params.id,
    })
      .populate("itemsIds")
      .populate("restaurantIds")
      .exec();

    // Checking the response
    if (!category) {
      res.status(200).json({ error: "category not found this id" });
    }

    //sending result 200 if succeesful
    res.status(200).json(category);
  } catch (error) {
    console.error("Error:", error);

    // Handle errors by responding with a 500 Internal Server Error
    res.status(500).json({ error: "Internal Server Error" });
  }
}
export async function createCategory(req: Request, res: Response) {
  try {
    const newCategory: CategoryDocument = new Category({
      name: req.body.name,
      itemIds: req.body.itemIds,
      restaurantIds: req.body.restaurantIds,
    });

    /** we are not validating because when the save method will be 
    called mongoose will automatically apply the validation of 
    all fields that we have set in the mongoose model **/
    const saveCategory = await newCategory.save();

    const reqItems = req.body.itemIds;
    const reqRestaurants = req.body.restaurantIds;

    if (saveCategory) {
      if (reqItems) {
        await Item.updateMany(
          { _id: { $in: reqItems } },
          { $addToSet: { categories: newCategory._id } }
        );
      }
      if (reqRestaurants) {
        await Restaurant.updateMany(
          { _id: { $in: reqRestaurants } },
          { $addToSet: { categoryId: newCategory._id } }
        );
      }
    }

    // sending response 201 if seccefully created
    res.status(201).json(saveCategory);
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

export async function replaceCategory(req: Request, res: Response) {
  try {
    const newCategory = {
      name: req.body.name,
      itemIds: req.body.itemIds,
      restaurantIds: req.body.restaurantIds,
    };
    if (!newCategory.name) {
      res.status(400).json({ message: "cannot update without name. " });
    }
    const replace = Category.findOneAndReplace(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    if (!replace) {
      res.status(404).json({ message: "not found" });
    }
    res.status(200).json(replace);
  } catch (error) {
    console.error("error");

    // Handle errors by responding with a 500 Internal Server Error
    res.status(500).json({ message: "Internal server error" });
  }
}
export async function updateCategory(req: Request, res: Response) {
  try {
    const updateData = req.body;
    const updatedData = await Category.findOneAndUpdate(
      { _id: req.params.id },
      updateData,
      { new: true }
    );

    if (!updatedData) {
      // send 404 in response if category not found
      res.status(404).json({ error: "category not found" });
    }
    const reqItems = req.body.itemIds;
    const reqRestaurants = req.body.restaurantIds;
    if (reqItems) {
      await Item.updateMany(
        { _id: { $in: reqItems } },
        { $addToSet: { categories: updatedData?._id } }
      );
    }
    if (reqRestaurants) {
      await Restaurant.updateMany(
        { _id: { $in: reqRestaurants } },
        { $addToSet: { categoryId: updatedData?._id } }
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
export async function deleteCategory(req: Request, res: Response) {
  try {
    const deletedCategory = await Category.findOneAndDelete({
      _id: req.params.id,
    });

    if (!deletedCategory) {
      // send 404 in response if category not found
      res.status(404).json({ error: "category not found" });
    }
    const deletedItems = deletedCategory?.itemIds;
    const deletedRestaurants = deletedCategory?.restaurantIds;
    if (deletedItems) {
      await Item.updateMany(
        { _id: { $in: deletedItems } },
        { $pull: { categories: deletedCategory?._id } }
      );
    }
    if (deletedRestaurants) {
      await Restaurant.updateMany(
        { _id: { $in: deletedRestaurants } },
        { $pull: { categoryId: deletedCategory?._id } }
      );
    }

    //sending response 200 if succeeful
    res.status(200).json(deletedCategory);
  } catch (error) {
    console.error("error");

    // Handle errors by responding with a 500 Internal Server Error
    res.status(500).json({ message: "Internal server error" });
  }
}
/**export {
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
};
*/
