import fs from 'fs';
import readline from 'node:readline';
import { json } from 'node:stream/consumers';


// fs.writeFileSync('data/text.txt', 'Sedang belajar Node.js Sync');
// fs.writeFile('data/text1.txt', 'Lagi Belajar Node.js Async', (e) => {
//     console.log(e)
// });


// const readFileSy= fs.readFileSync('data/text.txt', 'utf-8');
// console.log(readFileSy);

// const readFile = fs.readFile('data/text1.txt', 'utf-8', (e, data) => {
//     if (e) throw e;
//     console.log(data);
// });


// const readFileSy = fs.readFileSync('data/contacts.json', 'utf-8');
// console.log(typeof(readFileSy))


const rl = readline.createInterface( {
    input: process.stdin,
    output: process.stdout,
});


rl.question('Siapa nama kamu : ', (nama) => {
    
    rl.question('Berapa umur kamu : ', (umur) => {

        const data = { nama: nama, umur: umur }
        
        const file = fs.readFileSync('data/contacts.json', 'utf-8');
        const contacts = JSON.parse(file);
        
        contacts.push(data);
        
        fs.writeFileSync('data/contacts.json', JSON.stringify(contacts, null, 2));

        rl.close();
    })
});