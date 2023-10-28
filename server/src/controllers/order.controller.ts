import { Request, Response } from "express";
import { Order, OrderDocument } from "../models/order.model";

export async function getOrders(req: Request, res: Response) {
  try {
    const orders: OrderDocument[] = await Order.find({}).exec();

    // checking the returned data
    if (orders.length === 0) {
      res.status(404).json({ error: "orders not found" });
    }
    //sending status 200 correct if order return succeesfully
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error:", error);

    // Handle errors by responding with a 500 Internal Server Error
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function getOrdersComplete(req: Request, res: Response) {
  try {
    const orders: OrderDocument[] = await Order.find({}).exec();

    // checking the returned data
    if (orders.length === 0) {
      res.status(404).json({ error: "orders not found" });
    }
    //sending status 200 correct if order return succeesfully
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error:", error);

    // Handle errors by responding with a 500 Internal Server Error
    res.status(500).json({ error: "Internal Server Error" });
  }
}
export async function getOrder(req: Request, res: Response) {
  try {
    const order: OrderDocument | null = await Order.findOne({
      _id: req.params.id,
    }).exec();

    // Checking the response
    if (!order) {
      res.status(200).json({ error: "order not found this id" });
    }

    //sending result 200 if succeesful
    res.status(200).json(order);
  } catch (error) {
    console.error("Error:", error);

    // Handle errors by responding with a 500 Internal Server Error
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function getOrderAndUser(req: Request, res: Response) {
  try {
    const order: OrderDocument | null = await Order.findOne({
      _id: req.params.id,
    })
      .populate("userId")
      .exec();

    // Checking the response
    if (!order) {
      res.status(200).json({ error: "order not found this id" });
    }

    //sending result 200 if succeesful
    res.status(200).json(order);
  } catch (error) {
    console.error("Error:", error);

    // Handle errors by responding with a 500 Internal Server Error
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function getOrderAndItems(req: Request, res: Response) {
  try {
    const order: OrderDocument | null = await Order.findOne({
      _id: req.params.id,
    })
      .populate("itemIds")
      .exec();

    // Checking the response
    if (!order) {
      res.status(200).json({ error: "order not found this id" });
    }

    //sending result 200 if succeesful
    res.status(200).json(order);
  } catch (error) {
    console.error("Error:", error);

    // Handle errors by responding with a 500 Internal Server Error
    res.status(500).json({ error: "Internal Server Error" });
  }
}
export async function getOrderUserAndItems(req: Request, res: Response) {
  try {
    const order: OrderDocument | null = await Order.findOne({
      _id: req.params.id,
    })
      .populate("userId")
      .populate("itemIds")
      .exec();

    // Checking the response
    if (!order) {
      res.status(200).json({ error: "order not found this id" });
    }

    //sending result 200 if succeesful
    res.status(200).json(order);
  } catch (error) {
    console.error("Error:", error);

    // Handle errors by responding with a 500 Internal Server Error
    res.status(500).json({ error: "Internal Server Error" });
  }
}
export async function createOrder(req: Request, res: Response) {
  try {
    const newOrder: OrderDocument = new Order({
      userId: req.body.userId,
      itemIds: req.body.itemIds,
      quantity: req.body.quantity,
      sublineTotal: req.body.sublineTotal,
      total: req.body.total,
      status: req.body.status,
      subTime: req.body.subTime,
      actTime: req.body.actTime,
    });
    const saveOrder = await newOrder.save();
    // sending response 201 if seccefully created
    res.status(201).json(saveOrder);
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

export async function replaceOrder(req: Request, res: Response) {
  try {
    const replaceOrder = {
      userId: req.body.userId,
      itemIds: req.body.itemIds,
      quantity: req.body.quantity,
      sublineTotal: req.body.sublineTotal,
      total: req.body.total,
      status: req.body.status,
      subTime: req.body.subTime,
      actTime: req.body.actTime,
    };
    if (!replaceOrder.userId) {
      res.status(400).json({ error: "Cannot replace without user." });
    } else if (!replaceOrder.itemIds) {
      res.status(400).json({ error: "Cannot replace without items ." });
    } else if (!replaceOrder.quantity) {
      res.status(400).json({ error: "Cannot replace without quantity ." });
    } else if (!replaceOrder.status) {
      res.status(400).json({ error: "Cannot replace without status." });
    } else if (!replaceOrder.subTime) {
      res
        .status(400)
        .json({ error: "Cannot replace without submission time." });
    }
    const replacedRestaurant = await Order.findOneAndReplace(
      { _id: req.params.id },
      replaceOrder,
      { new: true }
    );
  } catch (error) {
    console.error("error");

    // Handle errors by responding with a 500 Internal Server Error
    res.status(500).json({ message: "Internal server error" });
  }
}
export async function updateOrder(req: Request, res: Response) {
  try {
    const updateData = req.body;
    const updatedOrder = await Order.findOneAndUpdate(
      { _id: req.params.id },
      updateData,
      { new: true }
    );

    if (!updatedOrder) {
      // send 404 in response if order not found
      res.status(404).json({ error: "order not found" });
    }

    //sending response 200 if succeeful
    res.status(200).json(updatedOrder);
  } catch (error) {
    console.error("error", error);

    // Handle errors by responding with a 500 Internal Server Error
    res.status(500).json({ message: "Internal server error" });
  }
}
export async function deleteOrder(req: Request, res: Response) {
  try {
    const deletedorder = await Order.findOneAndDelete({ _id: req.params.id });

    if (!deletedorder) {
      // send 404 in response if order not found
      res.status(404).json({ error: "order not found" });
    }

    //sending response 200 if succeeful
    res.status(204).json(deletedorder);
  } catch (error) {
    console.error("error");

    // Handle errors by responding with a 500 Internal Server Error
    res.status(500).json({ message: "Internal server error" });
  }
}
