import fs from 'fs'
import path from 'path'
import { stdin, stdout } from 'process';
import { fileURLToPath } from 'url';

export const transform = async () => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    let str = ''
    const writer = fs.createWriteStream(path.join(__dirname, 'files', 'fileToWrite.txt'))
    stdin.on('data', (data) => str+=data)

    process.on('SIGINT', () => {
        stdout.write(str.split("").reverse().join(""))
        process.exit();
    });
    
};
