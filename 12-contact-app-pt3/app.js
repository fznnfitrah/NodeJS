const yargs = require('yargs');
const contact = require('./contact.js');


// console.log(yargs.argv)

// yargs.command("add", "Isi Nama kamu",() => {}, (argv) => {
//     console.log(argv.nama);
// });


yargs.command({
    command: "add",
    describe: "Tambah Kontak",
    builder: {
        nama: {
            demandOption: true,
            describe: "Nama Panjang",
            type: 'string'
        },
        email: {
            demandOption: false,
            describe: "Email",
            type: 'string',
        },
        noHP: {
            demandOption: true,
            describe: "Nomer Handphone",
            type: 'string',
        }
    },
    handler(argv) {
        // const contact = {
        //     nama: argv.nama,
        //     email: argv.email,
        //     noHP: argv.noHP
        // }

        contact.addContacts(argv.nama, argv.email, argv.noHP);
    }
});

yargs.command({
    command: "list",
    describe: "Menampilkan semua list Kontak",
    handler() {
        contact.listContact();
    }
});


yargs.command({
    command: "detail",
    describe: "Menampilkan semua list Kontak",
    builder: {
        nama: {
            demandOption: true,
            describe: "Nama Panjang",
            type: 'string'
        },
    },
    handler(argv) {
        contact.detailContact(argv.nama);
    },
});


yargs.command({
    command: "delete",
    describe: "Menghapus kontak berdasarkan nama",
    builder: {
        nama: {
            demandOption: true,
            describe: "Nama Panjang",
            type: 'string'
        },
    },
    handler(argv) {
        contact.deleteContact(argv.nama);
    },
});


yargs.parse();
