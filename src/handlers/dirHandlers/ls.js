import { readdir } from 'node:fs/promises'
import { resolve } from 'node:path'
import showCurrDir from '../../helpers/showCurrDir.js'

export default async function lsHandle() {
    try {
        const currentDirectory = resolve(process.cwd());
        const files = await readdir(currentDirectory);
        console.table(files);
        showCurrDir();
    } catch (error) {
        console.error('Operation failed');
    }
}
