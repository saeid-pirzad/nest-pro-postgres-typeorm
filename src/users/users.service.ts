import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity.js';
import { Repository } from 'typeorm';
import { createUserDto } from './dto/createUser.dto.js';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async UserList(): Promise<any> {
    const users = await this.userRepository.findAndCount({
      order: { createAt: 'DESC' },
    });
    return {
      data: users[0],
      totalUser: users[1],
    };
  }

  async Create(createUserDto: createUserDto): Promise<User> {
    const newUser = this.userRepository.create(createUserDto);
    return await this.userRepository.save(newUser);
  }
}
