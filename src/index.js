import {createInterface} from 'node:readline';
import EventEmitter from 'node:events';
import lineHandler from "./handlers/lineHandler.js";
import cdHandle from "./handlers/dirHandlers/cd.js";
import lsHandle from "./handlers/dirHandlers/ls.js";
import upHandle from "./handlers/dirHandlers/up.js";
import catHandle from "./handlers/fsHandlers/cat.js";
import addHandle from "./handlers/fsHandlers/add.js";
import rnHandle from "./handlers/fsHandlers/rn.js";
import cpHandle from "./handlers/fsHandlers/cp.js";
import mvHandle from "./handlers/fsHandlers/mv.js";
import rmHandle from "./handlers/fsHandlers/rm.js";
import osHandle from "./handlers/osHandlers/os.js";
import hashHandle from "./handlers/hashHandlers/hash.js";
import compressHandle from "./handlers/zipHandlers/compress";
import decompressHandle from "./handlers/zipHandlers/decompress";

const args = process.argv.slice(2).join('');
const userName = args.slice(args.indexOf('=') + 1);
console.log('Welcome to the File Manager, ' + userName);

const eventEmitter = new EventEmitter();
eventEmitter
    .on('up', upHandle)
    .on('cd', cdHandle)
    .on('ls', lsHandle)
    .on('cat', catHandle)
    .on('add', addHandle)
    .on('rn', rnHandle)
    .on('cp', cpHandle)
    .on('mv', mvHandle)
    .on('rm', rmHandle)
    .on('os', osHandle)
    .on('hash', hashHandle)
    .on('compress', compressHandle)
    .on('decompress', decompressHandle)

const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
});

rl.on('line', lineHandler.bind(rl, eventEmitter))
    .on('SIGINT', () => rl.close())
    .on('close', () => {
        console.log(`Thank you for using File Manager, ${userName}!`);
        setTimeout(() => process.exit(0), 0);
    });
