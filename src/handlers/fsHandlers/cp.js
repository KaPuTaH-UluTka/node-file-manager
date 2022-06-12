import { parse, resolve } from 'node:path'
import { createReadStream, createWriteStream } from 'node:fs'
import { pipeline } from 'node:stream/promises'
import showCurrDir from '../../helpers/showCurrDir.js'

export default async function cpHandle([filePath, newDirPath]) {
    try {
        filePath = resolve(filePath);
        const { base } = parse(filePath);
        newDirPath = resolve(newDirPath, base);
        const readStream = createReadStream(filePath);
        const writeStream = createWriteStream(newDirPath);
        await pipeline(readStream, writeStream);
        showCurrDir();
    } catch (error) {
        console.error('Operation failed');
    }
}
