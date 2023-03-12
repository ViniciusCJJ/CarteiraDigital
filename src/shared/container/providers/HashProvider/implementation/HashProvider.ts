import bcrypt from 'bcrypt';
import { IHashProvider } from '../model/IHashProvider';

class HashProvider implements IHashProvider {
  generateHash(payload: string): Promise<string> {
    return bcrypt.hash(payload, 8);
  }

  compareHash(payload: string, hashed: string): Promise<boolean> {
    return bcrypt.compare(payload, hashed);
  }
}

export { HashProvider };
