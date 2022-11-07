import fs from 'fs';

import { getAbsolutePath } from './getAbsolutePath';

export const createFolder = async (folderPath: string): Promise<boolean> => {
  const absolutePath = getAbsolutePath(folderPath);
  return !(await fs.promises.mkdir(absolutePath, { recursive: true }));
};
