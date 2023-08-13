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

export const removeContact = async (contactId) => {
  try {
    const contactsJson = await readFile(contactsPath);
    const contacts = JSON.parse(contactsJson);
    const index = contacts.findIndex((contact) => contact.id === contactId);
    if (index !== -1) {
      const removedContact = contacts.splice(index, 1);
      await writeFile(contactsPath, JSON.stringify(contacts, null, 2));
      console.log(
        `${removedContact[0].name} is now removed from contacts list.`
      );
    } else {
      console.log("Contact you wish to remove does not exist");
    }
  } catch {
    console.log("An error occured while performing requested task.");
  }
};

export const addContact = async (name, email, phone) => {
  try {
    const contactsJson = await readFile(contactsPath);
    const contacts = JSON.parse(contactsJson);
    const emailList = contacts.map((contact) => contact.email);
    if (emailList.includes(email)) {
      //chekcing if contact with given email is not in db already
      console.log(
        `Contact with email address ${email} address is alredy saved in contacts list.`
      );
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
    console.log(`${newContact.name} has been added to contacts list.`);
  } catch {
    console.log("An error occured while performing requested task.");
  }
};
