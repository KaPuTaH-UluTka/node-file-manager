import { Writable } from 'node:stream'

export function showOutput() {
    return new Writable({
        decodeStrings: false,
        write(chunk, _, cb) {
            console.log(chunk);
            cb();
        },
    })
}
