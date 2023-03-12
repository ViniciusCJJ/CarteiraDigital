type expiryMode =
  | 'EX'
  | 'PX'
  | 'EXAT '
  | 'PXAT'
  | 'NX'
  | 'XX'
  | 'KEEPTTL'
  | 'GET';

export interface ISetRedisDto {
  key: string;
  value: any;
  time?: string;
  option?: expiryMode;
}
