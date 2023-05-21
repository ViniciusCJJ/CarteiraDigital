export interface INotificationsCreate {
  title: string;
  text: string;
  read?: boolean;
  goal_id?: string;
  user_id: string;
}
