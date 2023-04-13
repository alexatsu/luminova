export type IUser = {
  email: string;
  id: number;
};

export type AuthResponse = {
  refreshToken: string;
  accessToken: string;
  user: IUser /* supposedly user data from the server */;
};

export type AuthData = {
  email: string;
  password: string;
  confirmation?: string;
};
