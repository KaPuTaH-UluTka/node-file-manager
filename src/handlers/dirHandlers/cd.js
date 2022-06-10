import showCurrDir from '../../helpers/showCurrDir.js'

export default async function cdHandle([pathToDirectory]) {
    try {
        process.chdir(pathToDirectory);
        showCurrDir();
    } catch (error) {
        console.error('Operation failed');
    }
}
