import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  ParseUUIDPipe
} from '@nestjs/common';

import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @HttpCode(HttpStatus.CREATED)
  @Post('/create')
  async create(@Body() body: CreateUserDto) {
    return this.usersService.create(body);
  }

  @HttpCode(HttpStatus.OK)
  @Get('/all')
  findAll() {
    return this.usersService.findAll();
  }

  @HttpCode(HttpStatus.OK)
  @Get('/one/:id')
  findOne(@Param('id', new ParseUUIDPipe({ version: "4" })) id: string) {
    return this.usersService.findOne(id);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Patch('/update/:id')
  update(@Param('id', new ParseUUIDPipe({ version: "4" })) id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.updateUser(id, updateUserDto);
  }


  @HttpCode(HttpStatus.OK)
  @Delete('/delete/:id')
  remove(@Param('id', new ParseUUIDPipe({ version: "4" })) id: string) {
    return this.usersService.removeUser(id);
  }
}
