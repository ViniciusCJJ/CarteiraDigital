import { Exclude, Expose } from 'class-transformer';
import { User as IUser, UserRole } from '@prisma/client';
import { uploadConfig } from '@config/upload';

class User implements IUser {
  id: string;

  name: string;

  email: string;

  @Exclude()
  password: string;

  avatar: string | null;

  role: UserRole;

  device_token: string;

  @Expose({ name: 'avatar' })
  getAvatarUrl(): string | null {
    switch (uploadConfig.driver) {
      case 'disk':
        return `${process.env.APP_API_URL}/files/${this.avatar}`;
      case 'spaces':
        return `${process.env.FILE_ENDPOINT}/${this.avatar}`;
      default:
        return `${process.env.APP_API_URL}/files/default.png`;
    }
  }

  created_at: Date;

  updated_at: Date;
}

export { User };
