import { IsEmail, IsNotEmpty, IsNumber, IsString, MinLength } from 'class-validator';

export class UserRegDto {
  @IsString()
  name: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password: string;
}

export class UserLoginDto {
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

export class CreateTokenDto {
  @IsEmail()
  @IsString()
  email: string;

  @IsNumber()
  id: number;
}

export class UserTokenDto {
  @IsEmail()
  email: string;

  @IsString()
  refreshToken: string;
}
