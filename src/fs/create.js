import fs from 'fs'
import path from 'path'
import {fileURLToPath} from 'url';

export const create = async () => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const filePath = path.join(__dirname, 'files', 'fresh.txt')
    
    fs.exists(filePath, (isExists) => {
        if (isExists) throw Error('FS operation failed')
    })

    fs.writeFile(filePath, '', (err) => {
        if (err) throw err
    });

    fs.appendFile(filePath, 
        'I am fresh and young',
        (err) => {
          if (err) throw err.message
        }
    );
};
