import contactsService from "../services/contactsServices.js";

export const getAllContacts = async (req, res) => {
  console.log("User:", req.user);
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
  const newContact = await contactsService.addContact(req.body);
  res.status(201).json(newContact);
};

export const updateContact = async (req, res) => {
  const { id } = req.params;
  const updatedContact = await contactsService.updateContact(id, req.body);
  if (updatedContact === null) res.status(404).json({ message: "Not found" });
  else res.status(200).json(updatedContact);
};

export const updateStatusContact = async (req, res) => {
  const { id } = req.params;
  const updatedContact = await contactsService.updateContact(id, req.body);
  if (updatedContact === null) res.status(404).json({ message: "Not found" });
  else res.status(200).json(updatedContact);
};
