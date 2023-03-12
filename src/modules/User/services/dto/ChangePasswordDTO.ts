interface IChangePasswordDTO {
  user_id: string;
  request_id: string;
  new_password: string;
  old_password: string;
}

export { IChangePasswordDTO };
