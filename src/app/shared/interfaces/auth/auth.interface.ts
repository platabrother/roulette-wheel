export interface UserData {
  data: LoginCredentials[];
}

export interface LoginCredentials {
  userName: string;
  password: string;
}

export interface UserWithToken {
  id?: string;
  token: string;
  userName: string;
  password: string;
}
