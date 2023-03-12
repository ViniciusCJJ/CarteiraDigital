import { jwt_config } from '@config/auth';
import { sign } from 'jsonwebtoken';

export const jwtGenerate = (sub: string, isMaster: boolean): string => {
  return sign({ sub, isMaster }, jwt_config.secret, {
    expiresIn: jwt_config.expiresIn,
  });
};
