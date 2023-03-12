type FileType = string | string[];

type FileReturn<T> = T extends string ? string : string[];

interface IStorageProvider {
  saveFile<T extends FileType>(file: T): Promise<FileReturn<T>>;
  deleteFile(file: string): Promise<void>;
  deleteFileInTmpFolder(file: string): Promise<void>;
}

export { IStorageProvider, FileReturn, FileType };
