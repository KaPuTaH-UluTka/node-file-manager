import {createInterface} from 'node:readline';
import EventEmitter from 'node:events';
import lineHandler from "./handlers/lineHandler.js";

const args = process.argv.slice(2).join('');
const userName = args.slice(args.indexOf('=') + 1);
console.log('Welcome to the File Manager, ' + userName);

const eventEmitter = new EventEmitter();

const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
});

rl.on('line', lineHandler.bind(rl, eventEmitter))
    .on('SIGINT', () => rl.close())
    .on('close', () => {
        console.log(`Thank you for using File Manager, ${userName}!`);
        setTimeout(() => process.exit(0), 0)
    });
