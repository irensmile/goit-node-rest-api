import express from "express";
import { register } from "../controllers/usersControllers.js";
import validateBody from "../helpers/validateBody.js";
import { registerUserSchema } from "../schemas/userSchemas.js";

const usersRouter = express.Router();
usersRouter.post("/users/register", validateBody(registerUserSchema), register);

export default usersRouter;
