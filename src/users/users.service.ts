import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity.js';
import { Repository } from 'typeorm';
import { createUserDto } from './dto/createUser.dto.js';
import { LoginUserDto } from './dto/loginUser.dto.js';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private readonly jwtService: JwtService,
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

  async login(loginUserDto: LoginUserDto): Promise<any> {
    const exist = await this.userRepository.findOne({
      where: { email: loginUserDto.email },
      select: {
        id: true,
        name: true,
        email: true,
        password: true,
        role: true,
      },
    });

    if (!exist) {
      throw new BadRequestException('Email or password is incorrect');
    }

    const checkPassword = await bcrypt.compare(
      loginUserDto.password,
      exist.password,
    );

    if (!checkPassword) {
      throw new BadRequestException('Email or password is incorrect');
    }

    const token = await this.jwtService.sign(
      {
        id: exist.id,
        role: exist.role,
      },
      {
        secret: process.env.JWT_SECRET,
      },
    );

    return { ...exist, token };
  }
}
