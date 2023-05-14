interface IUpdateUserDTO {
  user_id: string;
  request_id: string;
  name?: string;
  email?: string;
  cpf?: string;
}

export { IUpdateUserDTO };
