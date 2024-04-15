import express from "express";
import { register } from "../controllers/usersControllers.js";

const usersRouter = express.Router();
usersRouter.post("/users/register", register);

export default usersRouter;
