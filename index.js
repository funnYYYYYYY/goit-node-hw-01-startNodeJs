const fs = require("fs/promises");
const contactsOperation = require("./contacts");
const { v4 } = require("uuid");

const { Command } = require("commander");
const program = new Command();
program
  .option("-a, --action <type>", "contact action")
  .option("-i, --id <type>", "contact id")
  .option("-n, --name <type>", "contact name")
  .option("-e, --email <type>", "contact email")
  .option("-p, --phone <type>", "contact phone");

program.parse(process.argv);

const argv = program.opts();

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
      const newContact = await contactsOperation.addContact(name, email, phone);
      console.log(newContact);
      break;

    case "remove":
      const removeContact = await contactsOperation.removeContact(id);
      console.log(removeContact);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
};

invokeAction(argv);
