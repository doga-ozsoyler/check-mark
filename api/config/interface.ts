import { Document } from "mongoose";
import { Request } from "express";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  checkNumber: number;
}

export interface IReqAuth extends Request {
  user?: IUser;
}

export interface IDecodedToken {
  id?: string;
  iat: number;
  exp: number;
}
