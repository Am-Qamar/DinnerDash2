import { Request, Response } from "express";

async function getAll(req: Request, res: Response) {
  try {
  } catch (error) {
    console.error(":");

    // Handle errors by responding with a 500 Internal Server Error
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function get(req: Request, res: Response) {
  try {
  } catch (error) {
    console.error("Error:");

    // Handle errors by responding with a 500 Internal Server Error
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function create(req: Request, res: Response) {
  try {
  } catch (error) {
    console.error("Error:");

    // Handle errors by responding with a 500 Internal Server Error
    res.status(500).json({ error: "Internal Server Error" });
  }
}
async function replace(req: Request, res: Response) {
  try {
  } catch (error) {
    console.error("error");

    // Handle errors by responding with a 500 Internal Server Error
    res.status(500).json({ message: "Internal server error" });
  }
}
async function update(req: Request, res: Response) {
  try {
  } catch (error) {
    console.error("error");

    // Handle errors by responding with a 500 Internal Server Error
    res.status(500).json({ message: "Internal server error" });
  }
}
async function deleteOne(req: Request, res: Response) {
  try {
  } catch (error) {
    console.error("error");

    // Handle errors by responding with a 500 Internal Server Error
    res.status(500).json({ message: "Internal server error" });
  }
}
module.exports = {
  getAll,
  get,
  create,
  replace,
  update,
  deleteOne,
};
