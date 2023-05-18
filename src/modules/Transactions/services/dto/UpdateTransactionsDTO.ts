interface IUpdateTransactionsDTO {
  transaction_id: string;
  title?: string;
  value?: number;
  category?: string;
  type?: string;
  user_id?: string;
  isMaster?: boolean;
}

export { IUpdateTransactionsDTO };
