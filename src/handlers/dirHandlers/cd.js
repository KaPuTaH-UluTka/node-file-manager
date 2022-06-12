import showCurrDir from '../../helpers/showCurrDir.js'

export default async function cdHandle([dirPath]) {
    try {
        process.chdir(dirPath);
        showCurrDir();
    } catch (error) {
        console.error('Operation failed');
    }
}
