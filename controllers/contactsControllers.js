import {
  createContactSchema,
  updateContactSchema,
} from "../schemas/contactsSchemas.js";
import contactsService from "../services/contactsServices.js";

export const getAllContacts = async (req, res) => {
  res.status(200).json(await contactsService.listContacts());
};

export const getOneContact = async (req, res) => {
  const { id } = req.params;
  const contact = await contactsService.getContactById(id);
  if (contact === null) res.status(404).json({ message: "Not found" });
  else res.status(200).json(contact);
};

export const deleteContact = async (req, res) => {
  const { id } = req.params;
  const contact = await contactsService.removeContact(id);
  if (contact === null) res.status(404).json({ message: "Not found" });
  else res.json(contact).status(200);
};

export const createContact = async (req, res, next) => {
  const validationResult = createContactSchema.validate(req.body);
  try {
    if (validationResult.error) {
      const errorMessages = validationResult.error.details.map(
        (detail) => detail.message
      );
      throw Error(errorMessages.join(", "));
    }

    const { name, email, phone } = req.body;

    const newContact = await contactsService.addContact(name, email, phone);
    res.status(201).json(newContact);
  } catch (error) {
    next({ status: 400, message: error.message });
  }
};

export const updateContact = async (req, res, next) => {
  const validationResult = updateContactSchema.validate(req.body);
  try {
    if (validationResult.error) {
      const errorMessages = validationResult.error.details.map(
        (detail) => detail.message
      );
      throw Error(errorMessages.join(", "));
    }

    const { id } = req.params;
    const { name, email, phone } = req.body;
    const updatedContact = await contactsService.updateContact(
      id,
      name,
      email,
      phone
    );
    if (updatedContact === null) res.status(404).json({ message: "Not found" });
    else res.status(200).json(updatedContact);
  } catch (error) {
    next({ status: 400, message: error.message });
  }
};
