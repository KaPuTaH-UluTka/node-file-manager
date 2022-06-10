export default function lineHandler(eventEmitter, line) {
    try {
        const [command, ...args] = line.split(' ');
        const events = ['up', 'cd', 'ls', 'cat', 'add', 'rn', 'cp', 'mv', 'rm', 'os', 'hash', 'compress', 'decompress'];
        if (events.includes(command)) {
            eventEmitter.emit(command, args);
        } else if (command === '.exit') {
            this.close();
        } else {
            throw Error('Invalid input');
        }
    } catch (err){
        console.error(err);
    }
}
