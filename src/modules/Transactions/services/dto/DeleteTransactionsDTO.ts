interface IDeleteTransactionsDTO {
  transaction_id: string;
  user_id: string;
  isMaster?: boolean;
}

export { IDeleteTransactionsDTO };
