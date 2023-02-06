const fs = require("fs/promises");
const { nanoid } = require("nanoid");
const path = require("path");

const contactsPath = path.join(__dirname, ".", "db", "contacts.json");

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath);
    const allContacts = JSON.parse(data);
    return allContacts;
  } catch (error) {
    console.log(error.message);
  }
};

const getContactById = async (contactId) => {
  try {
    const contacts = await listContacts();
    const result = contacts.find((item) => item.id === contactId);
    if (!result) {
      return null;
    }
    return result;
  } catch (error) {
    console.log(error.message);
  }
};

const removeContact = (contactId) => {
  // ...твій код
};

const addContact = async (name, email, phone) => {
  const contacts = await listContacts();
  const newContacts = { ...contacts, id: nanoid() };
  products.push(newContacts);
};

module.exports = {
  listContacts,
  getContactById,
  //   removeContact,
  addContact,
};
