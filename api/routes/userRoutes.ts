import express from "express";
import { verifyToken } from "../middlewares/auth";
import {
  signupController,
  signinController,
  getUserController,
  updateCheckController,
  updateUserController,
  deleteUserController,
} from "../controllers/userControllers";

const userRouter = express.Router();

userRouter.post("/signup", signupController);
userRouter.post("/signin", signinController);
userRouter.get("/info", verifyToken, getUserController);
userRouter.put("/info/update", verifyToken, updateUserController);
userRouter.put("/check/update", verifyToken, updateCheckController);
userRouter.delete("/delete", verifyToken, deleteUserController);

export default userRouter;
