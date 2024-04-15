import express from "express";
import { register, login } from "../controllers/usersControllers.js";
import validateBody from "../helpers/validateBody.js";
import { registerUserSchema } from "../schemas/userSchemas.js";

const usersRouter = express.Router();

usersRouter.post("/users/register", validateBody(registerUserSchema), register);
usersRouter.post("/users/login", validateBody(registerUserSchema), login);

export default usersRouter;
