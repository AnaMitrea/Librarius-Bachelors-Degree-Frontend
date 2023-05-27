export interface AuthJwtToken{
  sub: string,
  iat: number,
  exp: number
}

export interface RegisterRequestDto {
  username: string;
  email: string;
  password: string;
  rePassword: string;
}
