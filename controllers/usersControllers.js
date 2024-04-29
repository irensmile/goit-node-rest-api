import bcrypt from "bcrypt";
import gravatar from "gravatar";
import jwt from "jsonwebtoken";
import { mongooseUserModel } from "../schemas/userSchemas.js";
import HttpError from "../helpers/HttpError.js";
import Jimp from "jimp";
import path from "path";
import { promises as fs } from "fs";

// __dirname is not available with type=module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const register = async (req, res, next) => {
  const { email, password } = req.body;

  if ((await mongooseUserModel.findOne({ email: email })) !== null) {
    next(HttpError(409, "Email in use"));
    return;
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);

  const newUser = await mongooseUserModel.create({
    password: hashedPassword,
    email: email,
    avatarURL,
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

export const updateAvatar = async (req, res) => {
  const avatarDir = path.join(__dirname, "../", "public", "avatars");
  const { _id } = req.user;
  const { path: tmpUploadPath, originalname } = req.file;
  const fileName = `${_id}_${originalname}`;
  const completeUploadPath = path.join(avatarDir, fileName);

  const image = await Jimp.read(tmpUploadPath);
  await image.resize(250, 250).writeAsync(tmpUploadPath);
  await fs.rename(tmpUploadPath, completeUploadPath);

  const avatarURL = path.join("avatars", fileName);
  await mongooseUserModel.findByIdAndUpdate(_id, { avatarURL });
  res.json({ avatarURL });
};
