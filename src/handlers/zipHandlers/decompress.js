import { parse, resolve } from 'node:path'
import { createReadStream, createWriteStream } from 'node:fs'
import { pipeline } from 'node:stream/promises'
import { createBrotliDecompress } from 'node:zlib'
import showCurrDir from '../../helpers/showCurrDir.js'
import isDir from '../../helpers/isDir.js'
import isFile from '../../helpers/isFile.js'

export default async function decompressHandle([
                                                   filePath,
                                                   destinationPath,
                                               ]) {
    try {
        const isNotDirectory = !(await isDir(destinationPath));
        const isNotFile = !(await isFile(filePath));

        if (isNotDirectory) throw Error("it is not a directory");
        if (isNotFile) throw Error("it is not a file");

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
