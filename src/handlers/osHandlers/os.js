import { cpus, EOL, userInfo } from 'node:os'
import showCurrDir from '../../helpers/showCurrDir.js'

export default async function osHandle([param]) {
    try {
        const { username, homedir } = userInfo();
        const cpusInfo = cpus().map(({ model, speed }) => {
            speed = speed / 1000 + 'GHz';
            return { model, speed };
        })
        const osInfo = {
            '--EOL': JSON.stringify(EOL),
            '--cpus': cpusInfo,
            '--homedir': homedir,
            '--username': username,
            '--architecture': process.arch,
        }
        console.table(osInfo[param]);
        showCurrDir();
    } catch (error) {
        console.error('Operation failed');
    }
}
