const fs = require("fs/promises");
const contactsOperation = require("./contacts");
const { nanoid } = require("nanoid");

// const argv = require("yargs").argv;

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const listContactsAll = await contactsOperation.listContacts();
      console.table(listContactsAll);
      break;

    case "get":
      const ContactById = await contactsOperation.getContactById(id);
      if (!ContactById) {
        throw new Error(`Product with id=${id} not found`);
      }
      console.table(ContactById);
      break;

    case "add":
      const newContact = contactsOperation.addContact({
        id,
        name,
        phone,
        email,
      });
      console.table(object);
      break;

    // case "remove":
    //   // ... id
    //   break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
};
invokeAction({ action: "list" });
invokeAction({ action: "get", id: "11" });
invokeAction({
  action: "add",
  phone: "555-555-555",
  name: "Chipolino",
  email: "chipolina@mail.com",
  id: nanoid(),
});
// invokeAction(argv);
