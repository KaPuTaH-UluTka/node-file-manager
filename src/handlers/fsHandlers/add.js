import { open } from 'node:fs/promises'
import { resolve } from 'node:path'
import showCurrDir from '../../helpers/showCurrDir.js'

export default async function addHandle([newFileName]) {
    let handledFile;
    try {
        const filePath = resolve(process.cwd(), newFileName);
        handledFile = await open(filePath, 'w');
        showCurrDir();
    } catch (error) {
        console.error('Operation failed');
    }
    handledFile?.close();
}
