import fs from 'fs'
import path from 'path'
import { stdin } from 'process';
import { fileURLToPath } from 'url';

export const write = async () => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    const writer = fs.createWriteStream(path.join(__dirname, 'files', 'fileToWrite.txt'))
    stdin.on('data', (data) => writer.write(data))
};
