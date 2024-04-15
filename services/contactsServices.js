import { mongooseContactModel } from "../schemas/contactsSchemas.js";

export async function listContacts(user) {
  return await mongooseContactModel.find({ owner: user._id });
}

export async function getContactById(contactId, user) {
  try {
    return await mongooseContactModel.findOne({
      _id: contactId,
      owner: user._id,
    });
  } catch (error) {
    return null;
  }
}

export async function removeContact(contactId, user) {
  try {
    return await mongooseContactModel.findOneAndDelete({
      _id: contactId,
      owner: user._id,
    });
  } catch (error) {
    return null;
  }
}

export async function addContact(newContact, user) {
  return await mongooseContactModel.create({ owner: user._id, ...newContact });
}

export async function updateContact(id, updatedContact, user) {
  try {
    return await mongooseContactModel.findOneAndUpdate(
      { _id: id, owner: user._id },
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
