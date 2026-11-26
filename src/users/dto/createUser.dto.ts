import { IsEmail, IsString, MinLength } from 'class-validator';

export class createUserDto {
  @IsString()
  @MinLength(10)
  name: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
