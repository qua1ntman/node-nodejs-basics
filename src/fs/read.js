import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url';
import { stdout } from 'process';

export const read = async () => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    fs.readFile(path.join(__dirname, 'files', 'fileToRead.txt'), 'utf8', function(err, data){
        stdout.write(data)
    });
};

