export interface ICmsLoginQueryParams {
  userName: string;
  password: string;
}

export interface ICmsLoginRes {
  result: number;
  token: string;
  user_id: number;
  lifeTime_ms: number;
}
