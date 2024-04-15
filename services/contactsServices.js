import { mongooseContactModel } from "../schemas/contactsSchemas.js";

export async function listContacts() {
  return await mongooseContactModel.find();
}

export async function getContactById(contactId) {
  try {
    return await mongooseContactModel.findOne({ _id: contactId });
  } catch (error) {
    return null;
  }
}

export async function removeContact(contactId) {
  try {
    return await mongooseContactModel.findOneAndDelete({
      _id: contactId,
    });
  } catch (error) {
    return null;
  }
}

export async function addContact(newContact) {
  return await mongooseContactModel.create(newContact);
}

export async function updateContact(id, updatedContact) {
  try {
    return await mongooseContactModel.findOneAndUpdate(
      { _id: id },
      updatedContact,
      { new: true }
    );
  } catch (error) {
    return null;
  }
}

export default {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
