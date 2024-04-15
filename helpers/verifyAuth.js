import { mongooseUserModel } from "../schemas/userSchemas.js";
import jwt from "jsonwebtoken";

export const verifyAuth = async (req, res, next) => {
  console.log("Headers:", req.headers);
  const { authorization = "" } = req.headers;

  console.log("authorization:", authorization);
  const [bearer, token] = authorization.split(" ");

  console.log("Bearer: ", bearer, token);

  if (bearer !== "Bearer" || !token) {
    res.status(401).json({ message: "Not authorized" });
  }
  console.log("Bearer: ", bearer, token);
  try {
    const payload = jwt.verify(token, process.env.SECRET_WORD);
    console.log("payload:", payload);

    const foundUser = await mongooseUserModel.findById(payload.id);
    console.log("User: ", foundUser);

    if (!foundUser) {
      res.status(401).json({ message: "Not authorized" });
    }
    console.log("USER");
    if (foundUser.token != token) {
      res.status(401).json({ message: "Not authorized" });
    }

    req.user = foundUser;

    next();
  } catch (error) {
    res.status(401).json({ message: "Not authorized" });
  }
};
