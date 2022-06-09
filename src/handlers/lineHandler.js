export default function lineHandler(eventEmitter, line) {
    const [command, ...args] = line.split(' ');
    const events = ['up','cd','ls','cat','add','rn','cp','mv','rm','os','hash','compress','decompress'];
    if (events.includes(command)) {
        eventEmitter.emit(command, args);
    } else if (command === '.exit') {
        this.close();
    } else {
        console.error('Invalid input');
    }
}
