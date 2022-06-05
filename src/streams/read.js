import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url';
import { stdout } from 'process';

export const read = async () => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    fs.createReadStream(
    path.join(__dirname, 'files', 'fileToRead.txt'),
    'utf-8'
    ).on('data', chunk => stdout.write(chunk));
};
