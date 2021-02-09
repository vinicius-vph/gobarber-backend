// import fs from 'fs';
import {rename, stat, unlink} from 'fs/promises';
import {resolve} from 'path';
import uploadConfig from '@config/upload';
import IStorageProvider from '../models/IStorageProvider';

class DiskStorageProvider implements IStorageProvider {
  public async saveFile(file: string): Promise<string> {
    await rename(
      resolve(uploadConfig.tmpFolder, file),
      resolve(uploadConfig.uploadsFolder, file),
    );

    return file;
  }
  public async deleteFile(file: string): Promise<void> {
    const filePath = resolve(uploadConfig.uploadsFolder, file);

    try {
      await stat(filePath)
    } catch {
      return;
    }

   await unlink(filePath);
  }
}

export default DiskStorageProvider;