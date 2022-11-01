import { RequestHandler, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/user";
import { IReqAuth, IDecodedToken } from "../config/interface";
require("dotenv").config();

export const verifyToken: RequestHandler = async (
  req: IReqAuth,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers["authorization"]?.split(" ")[1];
    if (!token) return res.json({ message: "Invalid Authentication." });

    const decoded = <IDecodedToken>(
      jwt.verify(token, `${process.env.JWT_SECRET}`)
    );
    if (!decoded) return res.json({ message: "Invalid Authentication." });

    const user = await User.findById({ _id: decoded.id }).select("-password");
    if (!user) return res.json({ message: "User does not exist." });

    req.user = user;

    next();
  } catch (error: any) {
    res.json(error);
  }
};
