import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class AuthRegDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password: string;
}

export class LoginUserDto {
  @IsString()
  @IsEmail()
  email: string;
}
