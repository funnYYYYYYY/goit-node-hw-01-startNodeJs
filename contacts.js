const fs = require("fs/promises");
const { v4 } = require("uuid");
const contactsPath = require("./contactsPath");

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const allContacts = JSON.parse(data);
    if (allContacts.length !== 0) {
      return allContacts;
    }
    return null;
  } catch (error) {
    console.error(error);
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

const removeContact = async (contactId) => {
  try {
    const contacts = await listContacts();
    const idx = contacts.findIndex((item) => item.id === contactId);
    if (idx === -1) {
      return null;
    }

    const [removeContact] = contacts.splice(idx, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 4));
    return removeContact;
  } catch (err) {
    console.log(err.message);
  }
};

const addContact = async (name, email, phone) => {
  try {
    const contacts = await listContacts();
    const newContacts = { name, email, phone, id: v4() };
    contacts.push(newContacts);
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    return newContacts;
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};

// {
//   "id": "3",
//   "name": "Kennedy Lane",
//   "email": "mattis.Cras@nonenimMauris.net",
//   "phone": "(542) 451-7038"
// },
