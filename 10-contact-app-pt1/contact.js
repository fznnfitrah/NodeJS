const { rejects } = require('assert');
const fs = require('fs');
const { resolve } = require('path');
const readline = require('readline');

const rl = readline.createInterface({
    input : process.stdin,
    output : process.stdout,
});

const pathDir = "./data"
const fileDir = './data/contacts.json';

if(!fs.existsSync(pathDir)) {
    fs.mkdirSync(pathDir);
};

if(!fs.existsSync(fileDir)) {
    fs.writeFileSync(fileDir, '[]', 'utf-8');
};

const tulisPertanyaan = (pertanyaan) => {
    return new Promise((resolve, rejects) => {
        rl.question(pertanyaan, (answer) => {
            resolve(answer);
        });
    });
};



const addContacts = (nama, email, noHp) => {
    const contact = { nama, email, noHp };
    const fileBuffer = fs.readFileSync('data/contacts.json', 'utf-8');
    const contacts = JSON.parse(fileBuffer);

    contacts.push(contact);

    fs.writeFileSync('data/contacts.json', JSON.stringify(contacts));

    rl.close();
};

module.exports = {addContacts, tulisPertanyaan};