import fs from 'fs';
import path from 'path';
import xlsx from 'xlsx';

import { createFile } from './foldersUtils/createFile';

export const convertXlsx = async (input: string, output: string) => {
  if (!fs.existsSync(input)) throw new Error('File not exists');

  const file = xlsx.readFile(input);

  const result = file.SheetNames.reduce<Array<unknown>>((accum, item) => {
    const tempData = xlsx.utils.sheet_to_json(file.Sheets[item]);
    tempData.shift();
    accum.push(
      tempData.map((item) =>
        Object.fromEntries(
          Object.entries(item as object).map(([key, value]) => [
            key.trim().toLowerCase().replace(/\s/g, '_'),
            value,
          ]),
        ),
      ),
    );
    return accum;
  }, [] as Array<Record<string, unknown>>);

  const outputParsed = await path.parse(output);
  return createFile(
    outputParsed.dir,
    outputParsed.base,
    JSON.stringify(result.length === 1 ? result[0] : result),
  );
};
