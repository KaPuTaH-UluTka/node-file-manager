import { createReadStream, createWriteStream } from 'node:fs'
import { unlink } from 'node:fs/promises'
import { parse, resolve } from 'node:path'
import { pipeline } from 'node:stream/promises'
import showCurrDir from '../../helpers/showCurrDir.js'

export default async function mvHandle([filePath, newDirPath]) {
    try {
        filePath = resolve(filePath);
        const { base } = parse(filePath);
        newDirPath = resolve(newDirPath, base);
        const readStream = createReadStream(filePath);
        const writeStream = createWriteStream(newDirPath);
        await pipeline(readStream, writeStream);
        await unlink(filePath);
        showCurrDir();
    } catch (error) {
        console.error('Operation failed');
    }
}
