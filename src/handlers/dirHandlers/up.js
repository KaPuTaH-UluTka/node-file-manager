import showCurrDir from '../../helpers/showCurrDir.js'

export default async function upHandle() {
    try {
        process.chdir('..');
        showCurrDir();
    } catch (error) {
        console.error('Operation failed');
    }
}
