import { Notifications as INotifications } from '@prisma/client';

class Notifications implements INotifications {
  title: string;

  text: string;

  read: boolean;

  id: string;

  user_id: string;

  goal_id: string | null;

  created_at: Date;

  updated_at: Date;
}
export { Notifications };
