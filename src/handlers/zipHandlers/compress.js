import { createReadStream, createWriteStream } from 'node:fs'
import { parse, resolve } from 'node:path'
import { pipeline } from 'node:stream/promises'
import { createBrotliCompress } from 'node:zlib'
import showCurrDir from '../../helpers/showCurrDir.js'

export default async function compressHandle([filePath, destinationPath]) {
    try {
        filePath = resolve(filePath);
        const { base } = parse(filePath);
        const fileName = `${base}.br`;
        destinationPath = resolve(destinationPath, fileName);

        const readStream = createReadStream(filePath);
        const writeStream = createWriteStream(destinationPath);
        const brotliCompress = createBrotliCompress();
        await pipeline(readStream, brotliCompress, writeStream);
        showCurrDir();
    } catch (error) {
        console.error('Operation failed');
    }
}
