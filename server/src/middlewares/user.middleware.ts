import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// Middleware to authenticate JWT tokens
export function authenticateToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // Get the token from the Authorization header
  const token = req.headers["authorization"];

  // Check if the token is missing
  if (!token) {
    return res.status(401).json({ message: "Authentication required" });
  }

  // Verify the token using the secret key
  jwt.verify(token as string, "tamashau#5554", (err, user) => {
    if (err) {
      // Token verification failed, return an error response
      return res.status(403).json({ message: "Unauthorized" });
    }
    // Proceed to the next middleware or route handler
    next();
  });
}
