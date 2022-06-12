import { createHash } from 'node:crypto'
import { createReadStream } from 'node:fs'
import { resolve } from 'node:path'
import { pipeline } from 'node:stream/promises'
import showCurrDir from '../../helpers/showCurrDir.js'
import { showOutput } from '../../helpers/showOutput.js'

export default async function hashHandle([filePath]) {
    try {
        filePath = resolve(filePath);
        const hash = createHash('sha256');
        const readStream = createReadStream(filePath);
        await pipeline(readStream, hash.setEncoding('hex'), showOutput());
        showCurrDir();
    } catch (error) {
        console.error('Operation failed');
    }
}
