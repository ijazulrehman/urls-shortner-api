import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UserEntity } from './entities/user.entity';

@Controller('user')
@ApiTags('users')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @ApiOkResponse({
    type: UserEntity
  })
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }
}
