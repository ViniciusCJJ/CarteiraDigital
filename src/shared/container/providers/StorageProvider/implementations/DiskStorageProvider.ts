import fs from 'fs';
import path from 'path';
import { uploadConfig } from '@config/upload';
import { AppError } from '@shared/error/AppError';
import {
  FileReturn,
  FileType,
  IStorageProvider,
} from '../models/IStorageProvider';

class DiskStorageProvider implements IStorageProvider {
  async saveFile<T extends FileType>(file: T): Promise<FileReturn<T>> {
    if (Array.isArray(file)) {
      file.forEach(_file => {
        this.saveFile(_file);
      });

      return <FileReturn<T>>file;
    }

    try {
      await fs.promises.rename(
        path.resolve(uploadConfig.tmpFolder, file),
        path.resolve(uploadConfig.uploadsFolder, file),
      );
    } catch (err) {
      throw new AppError(`Erro ao realizar upload`);
    }

    return <FileReturn<T>>file;
  }

  public async deleteFile(file: string): Promise<void> {
    const filePath = path.resolve(uploadConfig.uploadsFolder, file);

    try {
      await fs.promises.stat(filePath);
    } catch {
      return;
    }

    await fs.promises.unlink(filePath);
  }

  public async deleteFileInTmpFolder(file: string): Promise<void> {
    const filePath = path.resolve(uploadConfig.tmpFolder, file);

    try {
      await fs.promises.stat(filePath);
    } catch {
      return;
    }

    await fs.promises.unlink(filePath);
  }
}

export { DiskStorageProvider };
