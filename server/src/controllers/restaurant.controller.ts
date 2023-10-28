import { Request, Response } from "express";
import { Category } from "../models/category.model";
import { Item } from "../models/item.model";
import { Restaurant, RestaurantDocument } from "../models/restaurant.model";

export async function getRestaurants(req: Request, res: Response) {
  try {
    const restaurants: RestaurantDocument[] = await Restaurant.find({}).exec();

    // checking the returned data
    if (restaurants.length === 0) {
      res.status(404).json({ error: "restaurants not found" });
    }
    //sending status 200 correct if succeesful
    res.status(200).json(restaurants);
  } catch (error) {
    console.error("Error:", error);

    // Handle errors by responding with a 500 Internal Server Error
    res.status(500).json({ error: "Internal Server Error" });
  }
}
export async function getRestaurantsComplete(req: Request, res: Response) {
  try {
    const restaurants: RestaurantDocument[] = await Restaurant.find({})
      .populate("categoryId")
      .populate("itemId")
      .exec();

    // checking the returned data
    if (restaurants.length === 0) {
      res.status(404).json({ error: "restaurants not found" });
    }
    //sending status 200 correct if succeesful
    res.status(200).json(restaurants);
  } catch (error) {
    console.error("Error:", error);

    // Handle errors by responding with a 500 Internal Server Error
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function getRestaurantAndCategories(req: Request, res: Response) {
  try {
    const restaurant: RestaurantDocument | null = await Restaurant.findOne({
      _id: req.params.id,
    })
      .populate("categoryId")
      .exec();

    // Checking the response
    if (!restaurant) {
      res.status(200).json({ error: "restaurant not found " });
    }

    //sending result 200 if succeesful
    res.status(200).json(restaurant);
  } catch (error) {
    console.error("Error:", error);

    // Handle errors by responding with a 500 Internal Server Error
    res.status(500).json({ error: "Internal Server Error" });
  }
}
export async function getRestaurant(req: Request, res: Response) {
  try {
    const restaurant: RestaurantDocument | null = await Restaurant.findOne({
      _id: req.params.id,
    }).exec();

    // Checking the response
    if (!restaurant) {
      res.status(200).json({ error: "restaurant not found " });
    }

    //sending result 200 if succeesful
    res.status(200).json(restaurant);
  } catch (error) {
    console.error("Error:", error);

    // Handle errors by responding with a 500 Internal Server Error
    res.status(500).json({ error: "Internal Server Error" });
  }
}
export async function getRestaurantAndItems(req: Request, res: Response) {
  try {
    const restaurant: RestaurantDocument | null = await Restaurant.findOne({
      _id: req.params.id,
    })
      .populate("itemId")
      .exec();

    // Checking the response
    if (!restaurant) {
      res.status(200).json({ error: "restaurant not found " });
    }

    //sending result 200 if succeesful
    res.status(200).json(restaurant);
  } catch (error) {
    console.error("Error:", error);

    // Handle errors by responding with a 500 Internal Server Error
    res.status(500).json({ error: "Internal Server Error" });
  }
}
export async function getRestaurantCateAndItems(req: Request, res: Response) {
  try {
    const restaurant: RestaurantDocument | null = await Restaurant.findOne({
      _id: req.params.id,
    })
      .populate("categoryId")
      .populate("itemId")
      .exec();

    // Checking the response
    if (!restaurant) {
      res.status(200).json({ error: "restaurant not found " });
    }

    //sending result 200 if succeesful
    res.status(200).json(restaurant);
  } catch (error) {
    console.error("Error:", error);

    // Handle errors by responding with a 500 Internal Server Error
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function createRestaurant(req: Request, res: Response) {
  try {
    const newRestaurant: RestaurantDocument = new Restaurant({
      name: req.body.name,
      discription: req.body.discription,
      categoryId: req.body.categoryId,
      itemId: req.body.itemId,
    });

    const saverestaurant = await newRestaurant.save();

    const reqCategories = req.body.categoryId;
    const reqItems = req.body.itemId;
    if (saverestaurant) {
      if (reqCategories) {
        await Category.updateMany(
          { _id: { $in: reqCategories } },
          { $addToSet: { restaurantIds: newRestaurant._id } }
        );
      }
      if (reqItems) {
        await Item.updateMany(
          { _id: { $in: reqItems } },
          { $addToSet: { restaurantIDs: newRestaurant._id } }
        );
      }
    }
    // sending response 201 if seccefully created
    res.status(201).json(saverestaurant);
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

export async function replaceRestaurant(req: Request, res: Response) {
  try {
    const replaceRestaurant = {
      name: req.body.name,
      discription: req.body.discription,
      categoryId: req.body.categoryId,
      itemId: req.body.itemId,
    };
    if (!replaceRestaurant.name) {
      res.status(400).json({ error: "cannot replace wothout name." });
    } else if (!replaceRestaurant.discription) {
      res.status(400).json({ error: "cannot replace wothout Description." });
    }
    const repalcedRestaurant = await Restaurant.findOneAndReplace(
      { _id: req.params.id },
      replaceRestaurant,
      { new: true }
    );
    if (!repalcedRestaurant) {
      res.status(404).json({ error: "Item did'nt found" });
    }
    res.status(200).json(repalcedRestaurant);
  } catch (error) {
    console.error("error");

    // Handle errors by responding with a 500 Internal Server Error
    res.status(500).json({ message: "Internal server error" });
  }
}
export async function updateRestaurant(req: Request, res: Response) {
  try {
    const updateData = req.body;
    const updatedRestaurant = await Restaurant.findOneAndUpdate(
      { _id: req.params.id },
      updateData,
      { new: true }
    );

    if (!updatedRestaurant) {
      // send 404 in response if restaurant not found
      res.status(404).json({ error: "restaurant not found" });
    }
    const reqCategories = req.body.categoryId;
    const reqItems = req.body.itemId;

    if (reqCategories) {
      await Category.updateMany(
        { _id: { $in: reqCategories } },
        { $addToSet: { restaurantIds: updatedRestaurant?._id } }
      );
    }
    if (reqItems) {
      await Item.updateMany(
        { _id: { $in: reqItems } },
        { $addToSet: { restaurantIDs: updatedRestaurant?._id } }
      );
    }

    //sending response 200 if succeeful
    res.status(200).json(updatedRestaurant);
  } catch (error) {
    console.error("error", error);

    // Handle errors by responding with a 500 Internal Server Error
    res.status(500).json({ message: "Internal server error" });
  }
}
export async function deleteRestaurant(req: Request, res: Response) {
  try {
    const deletedRestaurant = await Restaurant.findOneAndDelete({
      _id: req.params.id,
    });

    if (!deletedRestaurant) {
      // send 404 in response if restaurant not found
      res.status(404).json({ error: "restaurant not found" });
    }
    const reqCategories = deletedRestaurant?.categoryId;
    const reqItems = deletedRestaurant?.itemId;

    if (reqCategories) {
      await Category.updateMany(
        { _id: { $in: reqCategories } },
        { $addToSet: { restaurantIds: deletedRestaurant?._id } }
      );
    }
    if (reqItems) {
      await Item.updateMany(
        { _id: { $in: reqItems } },
        { $addToSet: { restaurantIDs: deletedRestaurant?._id } }
      );
    }
    //sending response 200 if succeeful
    res.status(200).json(deletedRestaurant);
  } catch (error) {
    console.error("error");

    // Handle errors by responding with a 500 Internal Server Error
    res.status(500).json({ message: "Internal server error" });
  }
}
/**export {
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
};
*/
