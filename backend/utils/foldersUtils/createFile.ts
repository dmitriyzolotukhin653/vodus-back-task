import fs from 'fs';

import { getAbsolutePath } from './getAbsolutePath';

export const createFile = async (
  pathToFile: string,
  fileName: string,
  str: string,
): Promise<boolean> => {
  const absolutePath = getAbsolutePath(pathToFile);
  if (!fs.existsSync(absolutePath))
    await fs.promises.mkdir(absolutePath, { recursive: true });
  await fs.promises.writeFile(`${absolutePath}/${fileName}`, str);
  return true;
};
