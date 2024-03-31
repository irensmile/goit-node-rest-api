import contactsService from "../services/contactsServices.js";

export const getAllContacts = (req, res) => {
  return contactsService.listContacts();
};

export const getOneContact = (req, res) => {
  const { id } = req.params;
  return contactsService.getContactById(id);
};

export const deleteContact = (req, res) => {
  return contactsService.removeContact(Id);
};

export const createContact = (req, res) => {
  const { name, email, phone } = req.body;
  return contactsService.addContact(name, email, phone);
};

export const updateContact = (req, res) => {
  const { id } = req.params;
  const { name, email, phone } = req.body;
  return contactsService.updateContact(id, name, email, phone);
};
