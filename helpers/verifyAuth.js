import { mongooseUserModel } from "../schemas/userSchemas.js";
import jwt from "jsonwebtoken";

export const verifyAuth = async (req, res, next) => {
  const { authorization = "" } = req.headers;

  const [bearer, token] = authorization.split(" ");

  if (bearer !== "Bearer" || !token) {
    res.status(401).json({ message: "Not authorized" });
    return;
  }

  try {
    const payload = jwt.verify(token, process.env.SECRET_WORD);
    const foundUser = await mongooseUserModel.findById(payload.id);

    if (!foundUser || foundUser.token != token || !foundUser.verify) {
      res.status(401).json({ message: "Not authorized" });
      return;
    }
    req.user = foundUser;
    next();
    
  } catch (error) {
    res.status(401).json({ message: "Not authorized" });
  }
};
