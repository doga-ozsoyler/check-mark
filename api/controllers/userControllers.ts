import { RequestHandler } from "express";
import bcrypt from "bcrypt";
import { User } from "../models/user";

export const signup: RequestHandler = async (req, res) => {
  const isEmailExist = await User.findOne({ email: req?.body?.email });

  if (isEmailExist) return res.json({ message: "User already exits." });

  try {
    const passwordHash = await bcrypt.hash(req?.body?.password, 12);

    const user = await User.create({
      name: req?.body?.name,
      email: req?.body?.email,
      password: passwordHash,
    });

    res.json(user);
  } catch (error) {
    res.json(error);
  }
};
