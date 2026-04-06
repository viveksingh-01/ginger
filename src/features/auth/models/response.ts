export interface IUser {
  id: string;
  name: string;
  email: string;
  phone: string;
}

export default interface IAuthResponse {
  statusCode: number;
  statusMessage: string;
  data: {
    user: IUser;
    token: string;
  };
}
