const { rejects } = require('assert');
const { resolve } = require('path');
const fs = require('fs');
// const validator = require('validator');

const pathDir = "./data"
const fileDir = './data/contacts.json';

if(!fs.existsSync(pathDir)) {
    fs.mkdirSync(pathDir);
};

if(!fs.existsSync(fileDir)) {
    fs.writeFileSync(fileDir, '[]', 'utf-8');
};

// Mengambil data kontak dari contact.json
const loadContact = () => {
    const fileBuffer = fs.readFileSync('data/contacts.json', 'utf-8');
    const contacts = JSON.parse(fileBuffer);

    return contacts;
}

// Mengambil data kontak yang sesuai dengan nama 
const detailContact = (nama) => {
    const contacts = loadContact();

    const contact = contacts.find(
        (contact) => contact.nama.toLowerCase() === nama.toLowerCase()
    );

    return contact
}

module.exports = { loadContact, detailContact }