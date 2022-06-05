import fs from 'fs';
import crypto from "crypto";
import path from 'path'
import { fileURLToPath } from 'url';

export const calculateHash = async () => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const fileBuffer = fs.readFileSync(path.join(__dirname, 'files', 'fileToCalculateHashFor.txt'));
    const hashSum = crypto.createHash('sha256');

    hashSum.update(fileBuffer);
    const hex = hashSum.digest('hex');
    console.log(hex);
};
