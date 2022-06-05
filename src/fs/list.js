import fs, {stat} from 'fs'
import {readdir} from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url';

export const list = async () => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    fs.exists(path.join(__dirname, 'files'), (isExists) => {
        if (!isExists) throw Error('FS operation failed')
    })

    readdir(path.join(__dirname, 'files'), {
        withFileTypes: true
    }).then(response => {
        response.forEach((stats) => {
            const filepath = path.join(__dirname, 'files', stats.name);
            stat(filepath, (error, st) => {
                if (error) return console.log(error.message);
                if (st.isFile()) {
                    console.log(stats.name);
                }
            });
        });
    });
};
