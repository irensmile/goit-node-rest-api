import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { mongooseUserModel } from "../schemas/userSchemas.js";
import HttpError from "../helpers/HttpError.js";

export const register = async (req, res, next) => {
  const { email, password } = req.body;

  if ((await mongooseUserModel.findOne({ email: email })) !== null) {
    next(HttpError(409, "Email in use"));
    return;
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await mongooseUserModel.create({
    password: hashedPassword,
    email: email,
  });

  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
    },
  });
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;

  const foundUser = await mongooseUserModel.findOne({ email: email });

  if (!foundUser) {
    next(HttpError(401, "Email or password is wrong"));
    return;
  }

  const isPasswordMatching = await bcrypt.compare(password, foundUser.password);
  if (!isPasswordMatching) {
    next(HttpError(401, "Email or password is wrong"));
    return;
  }

  const payload = { id: foundUser._id };
  const secret = process.env.SECRET_WORD;

  const generatedToken = jwt.sign(payload, secret);

  await mongooseUserModel.findByIdAndUpdate(foundUser.id, {
    token: generatedToken,
  });

  res.status(200).json({
    token: generatedToken,
    user: {
      email: email,
      subscription: foundUser.subscription,
    },
  });
};

export const logout = async (req, res) => {
  await mongooseUserModel.findByIdAndUpdate(
    { _id: req.user._id },
    { token: null }
  );
  res.status(204).json();
};

export const current = async (req, res) => {
  const { email, subscription } = req.user;
  res.json({ email, subscription });
};
