import { Worker } from 'worker_threads';
import path from 'path'
import { fileURLToPath } from 'url';
import os from 'os'

export const performCalculations = async () => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename)
    const coreNumber = os.cpus().length
    const resultArr = []
    let baseNum = 10

    for (let i = 0; i < coreNumber; i++) {  
        const worker = new Worker(path.join(__dirname, 'worker.js'), {workerData: baseNum+i})
        const resultObj = {status: 'resolved', data: ''}
        worker.on('error', (e) => resultObj.status = 'error')
        worker.on('message', (result) => {
            resultObj.data = result
            resultArr.push(resultObj)
        })
        worker.on('exit', () => {
            if (resultArr.length == coreNumber) {
                resultArr.sort((a, b) => a.data - b.data)
                console.log(resultArr);
            }      
        })
    }  
};
