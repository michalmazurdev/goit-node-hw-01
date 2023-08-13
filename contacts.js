import path from "path";
import { readFile, writeFile } from "node:fs/promises";
import { nanoid } from "nanoid";

//  Path to db folder where contacts.json is stored
const contactsPath = path.resolve("db", "contacts.json");

// Display all the contacts
export const listContacts = async () => {
  try {
    const contactsJson = await readFile(contactsPath);
    const contacts = JSON.parse(contactsJson);
    console.table(contacts);
  } catch {
    console.log("An error occured while performing requested task.");
  }
};
// listContacts();

//display specifiic contact by ID
export const getContactById = async (contactId) => {
  try {
    const contactsJson = await readFile(contactsPath);
    const contacts = JSON.parse(contactsJson);
    const requestedContact = contacts.find(
      (contact) => contact.id === contactId
    );
    requestedContact === undefined //checking if contact exists
      ? console.log(
          "We are sorry, there is no contact matching the ID that you provided"
        )
      : console.log(
          `Name: ${requestedContact.name}, email: ${requestedContact.email}, phone: ${requestedContact.phone} `
        );
  } catch {
    console.log("An error occured while performing requested task.");
  }
};
// getContactById("AeHIrLTr6JkxGE6SN-0Rw");

export const removeContact = async (contactId) => {
  try {
    const contactsJson = await readFile(contactsPath);
    const contacts = JSON.parse(contactsJson);
    const index = contacts.findIndex((contact) => contact.id === contactId);
    if (index !== -1) {
      contacts.splice(index, 1);
      await writeFile(contactsPath, JSON.stringify(contacts, null, 2));
      console.log("Requested contact is now removed.");
    } else {
      console.log("Contact you wish to remove does not exist");
    }
  } catch {
    console.log("An error occured while performing requested task.");
  }
};
// removeContact("ZbomC_BydR7M8qcGT7X5C");

export const addContact = async (name, email, phone) => {
  try {
    const contactsJson = await readFile(contactsPath);
    const contacts = JSON.parse(contactsJson);
    const emailList = contacts.map((contact) => contact.email);
    if (emailList.includes(email)) {
      //chekcing if contact with given email is not in db already
      console.log("Contact with this email adfdress is alredy saved");
      return;
    }
    const newContact = {
      id: nanoid(),
      name,
      email,
      phone,
    };
    contacts.push(newContact);
    await writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    console.log("Contact has been added");
  } catch {
    console.log("An error occured while performing requested task.");
  }
};
// addContact("Michal Mazur", "m.mazur40@gmial.com", "123-53-53");
