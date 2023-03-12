import { ISetRedisDto } from "../dtos/ISetRedisDto";

export interface IRedisProvider {
  get(key: string): Promise<string | undefined>;
  set(data: ISetRedisDto): Promise<string>;
  del(key: string): Promise<void>;
}
