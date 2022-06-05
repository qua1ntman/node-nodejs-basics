import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url';

export const remove = async () => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    fs.exists(path.join(__dirname, 'files', 'fileToRemove.txt'), (isExists) => {
        if (!isExists) throw Error('FS operation failed')
    }) 

    fs.unlink(path.join(__dirname, 'files', 'fileToRemove.txt'), () => {})
};
