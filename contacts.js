import path from "path";
import fs from "fs";
import { readFile, writeFile, readdir } from "node:fs/promises";
// import { nanoid } from "nanoid";
import * as readline from "readline";

//  Skomentuj i zapisz wartość
export const contactsPath = path.resolve("db", "contacts.json");

// TODO: udokumentuj każdą funkcję
const listContacts = async () => {
  try {
    const contactsJson = await readFile(contactsPath);
    const contacts = JSON.parse(contactsJson);
    console.table(contacts);
  } catch {
    console.log("There was an error while retrieving the contact list.");
  }
};
// listContacts();
const getContactById = async (contactId) => {
  try {
    const contactsJson = await readFile(contactsPath);
    const contacts = JSON.parse(contactsJson);
    const requestedContact = contacts.find(
      (contact) => contact.id === contactId
    );
    console.log(JSON.stringify(requestedContact));
  } catch {
    console.log(
      "We are sorry, we could not find a contact matching provided ID"
    );
  }
};
getContactById("AeHIrLTr6JkxGE6SN-0Rw");
function removeContact(contactId) {
  // ...twój kod
}

function addContact(name, email, phone) {
  // ...twój kod
}
