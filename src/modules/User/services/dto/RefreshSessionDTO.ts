import { User } from '../@prisma/client';

interface IRefreshSessionDTO {
  refresh_token: string;
}

interface IRefreshResponseDTO {
  user: User;
  access_token: string;
  refresh_token?: string;
}

export { IRefreshSessionDTO, IRefreshResponseDTO };
