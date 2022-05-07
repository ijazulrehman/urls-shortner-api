import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor() { }

  async create(createUserDto: CreateUserDto) {
    const user = new UserEntity(createUserDto);

    try {
      let newUser = await user.save();

      delete newUser.password;
      delete newUser.encryptedPassword;

      return newUser;
    } catch (error) {
      if (error.code === '23505')
        throw new HttpException('Email already exits', HttpStatus.BAD_REQUEST)
    }
  }
}
