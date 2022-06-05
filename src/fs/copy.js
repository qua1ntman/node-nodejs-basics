import fs from 'fs'
import path from 'path'
import {fileURLToPath} from 'url';
import { readdir } from 'fs/promises';

export const copy = async () => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const filePath = path.join(__dirname, 'files')

    fs.exists(filePath, (isExists) => {
        if (!isExists) throw Error('FS operation failed')
    }) 

    fs.exists(path.join(__dirname, 'files-copy'), (isExists) => {
        if (isExists) throw Error('FS operation failed')
    })


    fs.mkdir(path.join(__dirname, 'files-copy'), { recursive: true }, (err) => {
        if (err) console.log(err);
    });

    function copyCurrFile(file, mainWay, addWay) {
        fs.stat(path.join(__dirname,mainWay, file.name), (err, stats) => {
            if (stats.isDirectory()) {
            let copyWay = addWay+'\\'+file.name;
            let way = mainWay+'\\'+file.name;
            fs.mkdir(path.join(__dirname, copyWay), { recursive: true }, (err) => {
                if (err) console.log(err);
            });

            readdir(path.join(__dirname, way), { withFileTypes: true }, (err, files) => {
                if (err) console.log(err);
                return files;
            }).then( files => {
                addFile(files, way);
            });     

            } else if (stats.isFile()) {
            fs.copyFile(
                path.join(__dirname,mainWay, file.name), 
                path.join(__dirname,addWay, file.name), 
                (err) => {
                if (err) console.log('Error Found:', err);
                }
            );
            }
        });
    }

    function addFile (files, mainWay, addWay) {
        files.forEach(file => {
            copyCurrFile(file, mainWay, addWay);
        });
    }

    readdir(filePath, {withFileTypes: true}, (err, files) => {
        if (err) return console.log(err);
        return files;
    }).then(files => addFile(files, 'files', 'files-copy'));

    function removeCurrFile(file, mainWay, addWay) {
        fs.stat(path.join(__dirname, addWay, file.name), (err, stats) => {
            fs.access(path.join(__dirname,mainWay,file.name), (error) => {
            if (error) {
                if (stats.isDirectory()) {
                fs.rmdir(path.join(__dirname, addWay, file.name), err => {
                    if(err) console.log(err);
                });
                } else {
                fs.unlink(path.join(__dirname, addWay, file.name), err => {
                    if(err) console.log(err);
                });
                }
            }
            });
            fs.access(path.join(__dirname,  addWay, file.name), (err) => {
                if (err) return;
                else {
                    if (stats.isDirectory()) {
                    let copyWay = addWay+'\\'+file.name;
                    let way = mainWay+'\\'+file.name;
                    readdir(path.join(__dirname, copyWay), {withFileTypes: true}, (err, files) => {
                        if (err) console.log(err);
                        return files;
                    }).then( files => {
                        removeFiles(files, way);
                    });
                    }
                }
            });
        });
    }

    function removeFiles(files, mainWay, addWay) {
        if (files.length>1) {
            files.forEach(file => {
            removeCurrFile(file, mainWay, addWay);
            });
        } else if (files.length === 1) {
            removeCurrFile(files[0], mainWay, addWay);
        }
    }

    readdir(path.join(__dirname, 'files-copy'), {withFileTypes: true}, (err, files) => {
        if (err) return console.log(err);
        return files;
    }).then(files => removeFiles(files, 'files', 'files-copy'));
};
