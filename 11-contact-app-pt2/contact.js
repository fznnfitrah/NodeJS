const { rejects } = require('assert');
const { resolve } = require('path');
const fs = require('fs');
const validator = require('validator');
const chalk = require('chalk');

const pathDir = "./data"
const fileDir = './data/contacts.json';

if(!fs.existsSync(pathDir)) {
    fs.mkdirSync(pathDir);
};

if(!fs.existsSync(fileDir)) {
    fs.writeFileSync(fileDir, '[]', 'utf-8');
};

const addContacts = (nama, email, noHp) => {
    const contact = { nama, email, noHp };
    const fileBuffer = fs.readFileSync('data/contacts.json', 'utf-8');
    const contacts = JSON.parse(fileBuffer);

    if(!validator.isEmail(email)) {
        console.log(
            chalk.red.inverse.bold(`Email tidak valid!`)
        );
        return false;
    }

    if(!validator.isMobilePhone(noHp, "id-ID")) {
        console.log(
            chalk.red.inverse.bold("No Handphone tidak valid!")
        );
        return false;
    }

    contacts.push(contact);
    console.log('Kontak sudah tersimpan')
    fs.writeFileSync('data/contacts.json', JSON.stringify(contacts));
};

module.exports = {addContacts};