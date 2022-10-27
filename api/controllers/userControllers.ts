import { RequestHandler, Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/user";
require("dotenv").config();

export const signupController: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const isEmailExist = await User.findOne({ email: req?.body?.email });
    if (isEmailExist) return res.json({ message: "User already exits." });

    const passwordHash = await bcrypt.hash(req?.body?.password, 12);

    const user = await User.create({
      name: req?.body?.name,
      email: req?.body?.email,
      password: passwordHash,
    });

    res.json({ message: "Signup Success!", user });
  } catch (error: any) {
    res.json(error);
  }
};

export const signinController: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email });
    if (!user) return res.json({ message: "User doesn't exist." });

    const passwordIsValid = bcrypt.compareSync(password, user.password);
    if (!passwordIsValid)
      return res.json({ message: "Password is incorrect." });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET || "zaaa", {
      expiresIn: "365d", // 365 day
    });

    return res.json({ message: "Signin Success!", token: token });
  } catch (error: any) {
    res.json(error);
  }
};
