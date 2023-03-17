import fs from 'fs';
import path from 'path';
import mime from 'mime';
import aws, { S3 } from 'aws-sdk';
import { uploadConfig } from '@config/upload';
import { AppError } from '@shared/error/AppError';
import {
  FileReturn,
  FileType,
  IStorageProvider,
} from '../models/IStorageProvider';

class SpacesStorageProvider implements IStorageProvider {
  private client: S3;

  constructor() {
    const spacesEndpoint = new aws.Endpoint(
      `${process.env.DIGITAL_OCEAN_ENDPOINT}`,
    );

    this.client = new aws.S3({
      endpoint: spacesEndpoint,
      accessKeyId: process.env.DIGITAL_OCEAN_ACCESS_KEY,
      secretAccessKey: process.env.DIGITAL_OCEAN_SECRET_ACCESS_KEY,
      httpOptions: {
        timeout: 0,
      },
    });
  }

  async saveFile<T extends FileType>(file: T): Promise<FileReturn<T>> {
    if (Array.isArray(file)) {
      file.forEach(_file => {
        this.saveFile(_file);
      });

      return <FileReturn<T>>file;
    }

    const originalPath = path.resolve(uploadConfig.tmpFolder, file);

    const ContentType = mime.getType(originalPath);

    if (!ContentType) {
      throw new Error('File not found');
    }

    const fileContent = await fs.promises.readFile(originalPath);

    try {
      await this.client
        .upload({
          Bucket: uploadConfig.config.aws.bucket,
          Key: file,
          ACL: 'public-read',
          Body: fileContent,
          ContentType,
        })
        .promise();
    } catch (err) {
      throw new AppError(`Erro ao realizar upload`);
    }

    await fs.promises.unlink(originalPath);

    return <FileReturn<T>>file;
  }

  public async deleteFile(file: string): Promise<void> {
    await this.client
      .deleteObject({
        Bucket: uploadConfig.config.aws.bucket,
        Key: file,
      })
      .promise();
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

export { SpacesStorageProvider };
