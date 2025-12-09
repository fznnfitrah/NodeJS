const contact = require('./contact.js')

const main = async () => {
    const nama = await contact.tulisPertanyaan('Siapa nama Anda: ');
    const email = await contact.tulisPertanyaan('Masukkan Email Anda: ');
    const noHp = await contact.tulisPertanyaan('Berapa Nomer Handphone Anda: ');

    contact.addContacts(nama, email, noHp);
}

main();