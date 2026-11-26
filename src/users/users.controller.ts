import { Body, Controller, Get, Post } from '@nestjs/common';
import { createUserDto } from './dto/createUser.dto.js';
import { UsersService } from './users.service.js';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  UserList() {
    return this.userService.UserList();
  }
  @Post('register')
  createNewUser(@Body() createUserDto: createUserDto) {
    return this.userService.Create(createUserDto);
  }
}
