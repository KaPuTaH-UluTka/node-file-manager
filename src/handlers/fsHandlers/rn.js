import { rename } from 'node:fs/promises'
import { resolve, parse } from 'node:path'
import showCurrDir from '../../helpers/showCurrDir.js'

export default async function rnHandle([filePath, newFileName]) {
    try {
        filePath = resolve(filePath);
        const { dir } = parse(filePath);
        const pathFromFile = resolve(dir, newFileName);
        await rename(filePath, pathFromFile);
        showCurrDir();
    } catch (error) {
        console.error('Operation failed')
    }
}
