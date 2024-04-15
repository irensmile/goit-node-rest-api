import { mongooseUserModel } from "../schemas/userSchemas.js";
import jwt from "jsonwebtoken";

export const verifyAuth = async (req, res, next) => {
  const { authorization = "" } = req.headers;

  const [bearer, token] = authorization.split(" ");

  if (bearer !== "Bearer" || !token) {
    res.status(401).json({ message: "Not authorized" });
  }

  try {
    const payload = jwt.verify(token, process.env.SECRET_WORD);

    const foundUser = await mongooseUserModel.findById(payload.id);

    if (!foundUser) {
      res.status(401).json({ message: "Not authorized" });
    }
    if (foundUser.token != token) {
      res.status(401).json({ message: "Not authorized" });
    }

    req.user = foundUser;

    next();
  } catch (error) {
    res.status(401).json({ message: "Not authorized" });
  }
};
