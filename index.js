// const contacts = require("./contacts");
import {
  listContacts,
  getContactById,
  addContact,
  removeContact,
} from "./contacts.js";
import * as fs from "fs";
import { Command } from "commander";
import path from "path";

const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      await listContacts();
      break;

    case "get":
      await getContactById(id);
      break;

    case "add":
      await addContact(name, email, phone);
      break;

    case "remove":
      await removeContact(id);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
};

invokeAction(argv);
