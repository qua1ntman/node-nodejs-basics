import {createUnzip} from 'zlib';
import {pipeline} from 'stream';
import {
    createReadStream,
    createWriteStream
} from 'fs'
import path from 'path'
import { fileURLToPath } from 'url';

export const decompress = async () => {
        const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename); 

    const gzip = createUnzip();
    const source = createReadStream(path.join(__dirname, 'files', 'archive.gz'));
    const destination = createWriteStream(path.join(__dirname, 'files', 'fileToCompress.txt'));

    pipeline(source, gzip, destination, (err) => {
        if (err) {
          console.error('An error occurred:', err);
          process.exitCode = 1;
        }
    });
};
