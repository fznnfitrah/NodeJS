import readline from 'readline';
import { stdin as input, stdout as output } from 'node:process'

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

rl.question("apa makanan favoritmu? ", (a) => {
    console.log(`Jadi itu makanan adalah ${a}`);

    rl.close
})