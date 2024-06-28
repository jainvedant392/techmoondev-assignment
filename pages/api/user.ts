import jwt from "jsonwebtoken";
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const token = req.headers.authorization?.split(" ")[1];
  const SECRET_KEY = process.env.JWT_SECRET_KEY || "secret";

  if (token) {
    try {
      const decoded = jwt.verify(token, SECRET_KEY);
      res.status(200).json(decoded);
    } catch (error) {
      res.status(401).json({ message: "Invalid token" });
    }
  } else {
    res.status(401).json({ message: "Token not provided" });
  }
}
