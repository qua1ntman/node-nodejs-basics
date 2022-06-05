import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url';

export const rename = async () => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    fs.exists(path.join(__dirname, 'files', 'wrongFilename.txt'), (isExists) => {
        if (!isExists) throw Error('FS operation failed')
    }) 

    fs.exists(path.join(__dirname, 'files', 'properFilename.md'), (isExists) => {
        if (isExists) throw Error('FS operation failed')
    })

    fs.rename(path.join(__dirname, 'files', 'wrongFilename.txt'), path.join(__dirname, 'files', 'properFilename.md'), () => {});

};
