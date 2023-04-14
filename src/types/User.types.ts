type TUser<T> = {
  email: string;
  id: T;
};
type AuthResponse = {
  refreshToken: string;
  accessToken: string;
  user: TUser<string> /* supposedly user data from the server */;
};

type AuthData = {
  email: string;
  password: string;
  confirmation?: string;
};
export type { TUser, AuthResponse, AuthData };
