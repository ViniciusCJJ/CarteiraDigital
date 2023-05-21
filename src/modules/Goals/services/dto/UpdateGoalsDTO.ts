interface IUpdateGoalsDTO {
  goal_id: string;
  title?: string;
  value?: number;
  final_date?: Date;
  total_raised?: number;
  user_id?: string;
  isMaster?: boolean;
}

export { IUpdateGoalsDTO };
