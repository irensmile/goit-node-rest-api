import bcrypt from "bcrypt";
import { mongooseUserModel } from "../schemas/userSchemas.js";

export const register = async (req, res) => {
  if (mongooseUserModel.findOne({ email: req.body.email }) !== null) {
    res.status(409).json({
      message: "Email in use",
    });
  }

  bcrypt.hash(req.body.password, 10, async function (err, hash) {
    const user = await mongooseUserModel.create({
      password: hash,
      email: req.body.email,
    });
    res.status(201).json({
      user: {
        email: user.email,
        subscription: user.subscription,
      },
    });
  });
};
