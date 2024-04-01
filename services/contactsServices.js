import { promises as fs } from "fs";
import { fileURLToPath } from "url";
import { dirname } from "path";
import path from "path";
import { nanoid } from "nanoid";

// __dirname is not available with type=module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const contactsPath = path.join(__dirname, "..", "db", "contacts.json"); // Шлях до файлу з контактами

export async function listContacts() {
  try {
    // Зчитуємо дані з файлу
    const data = await fs.readFile(contactsPath);

    // Перетворюємо рядок JSON у масив об'єктів
    const contacts = JSON.parse(data);
    // Повертаємо масив контактів
    return contacts;
  } catch (error) {
    // Обробляємо помилку, якщо файл не знайдено або сталася інша помилка при зчитуванні
    console.error("Failed to read contacts:", error);
    return []; // Повертаємо порожній масив у випадку помилки
  }
}

export async function getContactById(contactId) {
  try {
    const data = await fs.readFile(contactsPath);
    const listElements = JSON.parse(data);
    const foundElement = listElements.find(
      (element) => element.id === contactId
    );
    return foundElement || null;
  } catch (error) {
    console.error("Failed to find a contact:", error);
    return null;
  }
}

export async function removeContact(contactId) {
  try {
    const data = await fs.readFile(contactsPath);
    let contacts = JSON.parse(data);
    const index = contacts.findIndex((contact) => contact.id === contactId);

    // Якщо контакт не знайдений, повертаємо null
    if (index === -1) return null;

    //Знайшли елемент для видаленя з індексом index

    const removedContact = contacts.splice(index, 1)[0];

    // Записуємо зміни у файл
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    // Повертаємо видалений контакт
    return removedContact;
  } catch (error) {
    // Обробляємо помилку, якщо файл не знайдено або сталася інша помилка при зчитуванні
    console.error("Failed to remove contact:", error);
    return null; // Повертаємо null у випадку помилки
  }
}

export async function addContact(name, email, phone) {
  try {
    const data = await fs.readFile(contactsPath);
    let contacts = JSON.parse(data);
    const newContact = {
      id: nanoid(),
      name,
      email,
      phone,
    };
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return newContact;
  } catch (error) {
    console.error("Unable to add a new contact:", error);
    return null;
  }
}

export async function updateContact(id, name, email, phone) {
  try {
    const data = await fs.readFile(contactsPath);
    let contacts = JSON.parse(data);

    const foundElement = contacts.find((element) => element.id === id);
    if (foundElement === null) return null;

    if (name) foundElement.name = name;
    if (email) foundElement.email = email;
    if (phone) foundElement.phone = phone;

    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return foundElement;
  } catch (error) {
    console.error("Unable to update a contact:", error);
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
