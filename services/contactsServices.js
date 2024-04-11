import { mongooseContactModel } from "./schemas/contactsSchemas.js";

export async function listContacts() {
  return await mongooseContactModel.find();
}

export async function getContactById(contactId) {
  return await mongooseContactModel.findOne({ _id: contactId });
}

export async function removeContact(contactId) {
  return await mongooseContactModel.findOneAndDelete({
    _id: contactId,
  });
}

export async function addContact(newContact) {
  return await mongooseContactModel.create(newContact);
}

export async function updateContact(id, updatedContact) {
  return await mongooseContactModel.findOneAndUpdate(
    { _id: id },
    updatedContact,
    { new: true }
  );
}

export default {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
