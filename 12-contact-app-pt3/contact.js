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

// Mengambil data dari contact.json
const loadContact = () => {
    const fileBuffer = fs.readFileSync('data/contacts.json', 'utf-8');
    const contacts = JSON.parse(fileBuffer);

    return contacts;
}


// Menambahkan data ke dalam contact.json
const addContacts = (nama, email, noHp) => {
    const contact = { nama, email, noHp };

    const contacts = loadContact();

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


// Menampilkan Semua Kontak yang ada di contact.json
const listContact = () => {
    const contacts = loadContact();

    contacts.forEach((contact, i) => {
        console.log(`${i+1}. ${contact.nama}`)
    });

}


// Menampilkan detail sebuah Kontak berdasarkan nama
const detailContact = (nama) => {
    const contacts = loadContact();

    const contact = contacts.find(
        (contact) => contact.nama.toLowerCase() === nama.toLowerCase()
    );

    if(!contact) {
        console.log(
            chalk.red.inverse.bold(`Kontak ${nama} tidak ditemukan ada dalam kontak`)
        );
        return false
    };

    console.log(`Nama: ${contact.nama}`);
    console.log(`Nomer Handphone: ${contact.noHp}`);
    
    if(contact.email) {
        console.log(`email: ${contact.email}`);
    }
}


// Menghapus kontak yang ada di contact.json
const deleteContact = (nama) => {
    const contacts = loadContact();

    const newContacts = contacts.filter(
        (contact) => contact.nama.toLowerCase() !== nama.toLowerCase()
    )

    if( contacts.length === newContacts.length) {
        console.log(
            chalk.red.inverse.bold(`Kontak ${nama} gagal dihapus karena tidak ditemukan`)
        );
        return false;
    }

    fs.writeFileSync('data/contacts.json', JSON.stringify(newContacts));
    console.log(chalk.green.inverse.bold(`Kontak berhasil diperbarui`))

}




module.exports = {addContacts, listContact, detailContact, deleteContact};