import express from "express";
import {
  register,
  login,
  logout,
  current,
  updateAvatar,
  verifyEmail,
  resendVerifyEmail
} from "../controllers/usersControllers.js";
import validateBody from "../helpers/validateBody.js";
import { registerUserSchema } from "../schemas/userSchemas.js";
import { verifyAuth } from "../helpers/verifyAuth.js";
import { upload } from "../helpers/upload.js";

const usersRouter = express.Router();

usersRouter.post("/users/register", validateBody(registerUserSchema), register);
usersRouter.post("/users/login", validateBody(registerUserSchema), login);

usersRouter.post("/users/logout", verifyAuth, logout);
usersRouter.get("/users/current", verifyAuth, current);

usersRouter.patch(
  "/users/avatars",
  verifyAuth,
  upload.single("avatar"),
  updateAvatar
);

usersRouter.get("/users/verify/:verificationToken", verifyEmail);

usersRouter.post("/users/verify", resendVerifyEmail);

export default usersRouter;
