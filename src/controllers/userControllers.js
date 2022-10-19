import codes from "../config/codes.js";
import { User } from "../database/index.js";

export const newUser = async (req, res, next) => {
  const userData = req.body;

  const newUser = await User.create(userData);

  res.status(codes.created).json({ newUser });
};
