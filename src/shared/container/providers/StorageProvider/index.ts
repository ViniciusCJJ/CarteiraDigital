import { container } from 'tsyringe';
import { uploadConfig } from '@config/upload';

import { IStorageProvider } from './models/IStorageProvider';

import { DiskStorageProvider } from './implementations/DiskStorageProvider';
import { S3StorageProvider } from './implementations/S3StorageProvider';
import { SpacesStorageProvider } from './implementations/SpacesStorageProvider';

const providers = {
  disk: DiskStorageProvider,
  s3: S3StorageProvider,
  spaces: SpacesStorageProvider,
};

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  providers[uploadConfig.driver],
);
