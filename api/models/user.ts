import mongoose from "mongoose";

interface IUser {
  name: string;
  email: string;
  password: string;
  checkNumber: number;
}

const UserSchema = new mongoose.Schema<IUser>({
  name: { type: String, require: true },
  email: { type: String, require: true },
  password: { type: String, require: true },
  checkNumber: { type: Number, default: 0 },
});

const User = mongoose.model<IUser>("User", UserSchema);

export { User };
