import { unlink } from 'node:fs/promises'
import { resolve } from 'node:path'
import showCurrDir from '../../helpers/showCurrDir.js'

export default async function rmHandle([filePath]) {
    try {
        filePath = resolve(filePath);
        await unlink(filePath);
        showCurrDir();
    } catch (error) {
        console.error('Operation failed')
    }
}
