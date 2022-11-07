import path from 'path';
import * as process from 'process';

import { convertXlsx } from '../utils/convertXlsx';

if (!(process.argv[2] && process.argv[3])) {
  throw new Error('Input and output paths not added');
}

const inputPath = path.resolve(__dirname, '../' + process.argv[2]);
const outputPath = path.resolve(__dirname, '../' + process.argv[3]);

convertXlsx(inputPath, outputPath);
