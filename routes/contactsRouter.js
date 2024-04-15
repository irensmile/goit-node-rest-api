import express from "express";
import {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateContact,
  updateStatusContact,
} from "../controllers/contactsControllers.js";
import validateBody from "../helpers/validateBody.js";
import {
  createContactSchema,
  favoriteSchema,
  updateContactSchema,
} from "../schemas/contactsSchemas.js";
import { verifyAuth } from "../helpers/verifyAuth.js";

const contactsRouter = express.Router();

contactsRouter.get("/", verifyAuth, getAllContacts);
contactsRouter.get("/:id", verifyAuth, getOneContact);

contactsRouter.delete("/:id", verifyAuth, deleteContact);

contactsRouter.post(
  "/",
  verifyAuth,
  validateBody(createContactSchema),
  createContact
);

contactsRouter.put(
  "/:id",
  verifyAuth,
  validateBody(updateContactSchema),
  updateContact
);

contactsRouter.patch(
  "/:id/favorite",
  validateBody(favoriteSchema),
  updateStatusContact
);

export default contactsRouter;
