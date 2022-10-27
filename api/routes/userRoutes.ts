import express from "express";
import {
  signupController,
  signinController,
} from "../controllers/userControllers";

const userRouter = express.Router();

userRouter.post("/signup", signupController);
userRouter.post("/signin", signinController);

export default userRouter;
