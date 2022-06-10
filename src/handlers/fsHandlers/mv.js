import { createReadStream, createWriteStream } from 'node:fs'
import { unlink } from 'node:fs/promises'
import { parse, resolve } from 'node:path'
import { pipeline } from 'node:stream/promises'
import showCurrDir from '../../helpers/showCurrDir.js'
import isDir from '../../helpers/isDir.js'

export default async function mvHandle([filePath, newDirPath]) {
    try {
        const isNotDir = !(await isDir(newDirPath));

        if (isNotDir) throw Error('invalid path_to_new_directory');

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
