import path from 'path';
import os from 'os';

export const getAbsolutePath = (filepath: string, delim = '/'): string => {
  if (!filepath) return '';
  const homedir = os.homedir();
  filepath = filepath.replace(/~/g, homedir + delim);
  return path.resolve(filepath);
};
