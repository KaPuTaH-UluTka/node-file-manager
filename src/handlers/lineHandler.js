export default function lineHandler(eventEmitter, line) {
    try {
        let [command, ...args] = line.split(' ');

        if (/"|'/g.test(args)) {
            args = args
                .join(' ')
                .split(/["'] | ["']/)
                .map((arg) => arg.replace(/"|'/g, ''));
        }

        const twoArgEvents = ['rn', 'cp', 'mv', 'compress', 'decompress'];
        const oneArgEvents = ['cd', 'cat', 'add', 'rm', 'os', 'hash'];
        const zeroArgEvents = ['up', 'ls'];
        if (twoArgEvents.includes(command) && args.length === 2) {
            eventEmitter.emit(command, args);
        } else if (oneArgEvents.includes(command) && args.length === 1) {
                eventEmitter.emit(command, args);
        } else if (zeroArgEvents.includes(command)) {
            eventEmitter.emit(command);
        } else if (command === '.exit') {
            this.close();
        } else {
            throw Error('Invalid input');
        }
    } catch (err){
        console.error(err);
    }
}
