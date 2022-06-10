import { createReadStream } from 'node:fs'
import { resolve } from 'node:path'
import showCurrDir from '../../helpers/showCurrDir.js'
import { pipeline } from 'node:stream/promises'
import { showOutput } from '../../helpers/showOutput.js'

export default async function catHandle([filePath]) {
    try {
        filePath = resolve(filePath);
        const readStream = createReadStream(filePath, { encoding: 'utf8' });
        await pipeline(readStream, showOutput());
        showCurrDir();
    } catch (error) {
        console.error('Operation failed');
    }
}
