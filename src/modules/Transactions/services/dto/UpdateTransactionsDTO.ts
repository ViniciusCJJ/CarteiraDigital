interface IUpdateTransactionsDTO {
  transaction_id: string;
  title?: string;
  value?: number;
  category?: string;
  type?: string;
  date?: Date;
  user_id?: string;
  isMaster?: boolean;
}

export { IUpdateTransactionsDTO };
