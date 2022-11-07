import fs from 'fs';

import { getAbsolutePath } from './getAbsolutePath';

export const checkFolderExistence = (folderPath: string): boolean => {
  const absoluteFolderPath = getAbsolutePath(folderPath);
  return fs.existsSync(absoluteFolderPath);
};
