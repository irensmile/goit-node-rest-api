import { promises as fs } from "fs";
import { fileURLToPath } from "url";
import { dirname } from "path";
import path from "path";
import { nanoid } from "nanoid";
import { mongooseContactModel } from "./schemas/contactsSchemas.js";

// __dirname is not available with type=module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const contactsPath = path.join(__dirname, "..", "db", "contacts.json"); // Шлях до файлу з контактами

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

export async function addContact(name, email, phone) {
  return await mongooseContactModel.create({
    name: name,
    email: email,
    phone: phone,
  });
}

export async function updateContact(id, name, email, phone) {
  return await mongooseContactModel.findOneAndUpdate(
    { _id: id },
    { name: name, email: email, phone: phone },
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
