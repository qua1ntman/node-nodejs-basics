import path from 'path'
import { release, version } from'os';
import { createServer as createServerHttp}  from 'http';
import './files/c';

const random = Math.random();

export let unknownObject;

if (random > 0.5) {
    unknownObject = await import('./files/a.json');
} else {
    unknownObject = await import('./files/b.json');
}

console.log(`Release ${release()}`);
console.log(`Version ${version()}`);
console.log(`Path segment separator is "${path.sep}"`);

console.log(`Path to current file is ${__filename}`);
console.log(`Path to current directory is ${__dirname}`);

export const createMyServer = createServerHttp((_, res) => {
    res.end('Request accepted');
});
