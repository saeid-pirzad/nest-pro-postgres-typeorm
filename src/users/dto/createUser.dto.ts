import { IsEmail, IsEnum, IsString, MinLength } from 'class-validator';
import { Role } from '../../common/enums/role.enum.js';

export class createUserDto {
  @IsString()
  @MinLength(10)
  name: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  @IsEnum(Role)
  role: Role = Role.USER;
}
