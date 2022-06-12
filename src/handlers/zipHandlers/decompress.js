import { parse, resolve } from 'node:path'
import { createReadStream, createWriteStream } from 'node:fs'
import { pipeline } from 'node:stream/promises'
import { createBrotliDecompress } from 'node:zlib'
import showCurrDir from '../../helpers/showCurrDir.js'

export default async function decompressHandle([
                                                   filePath,
                                                   destinationPath,
                                               ]) {
    try {
        filePath = resolve(filePath);
        const { name, ext } = parse(filePath);

        if (!ext.includes('.br')) throw Error('invalid file extension');

        destinationPath = resolve(destinationPath, name);

        const readStream = createReadStream(filePath);
        const writeStream = createWriteStream(destinationPath);
        const brotliDecompress = createBrotliDecompress();
        await pipeline(readStream, brotliDecompress, writeStream);
        showCurrDir();
    } catch (error) {
        console.error('Operation failed');
    }
}
