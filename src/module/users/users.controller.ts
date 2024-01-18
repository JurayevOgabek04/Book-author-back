import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Headers,
  HttpCode,
  HttpStatus,
  ParseUUIDPipe,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express'

import { UsersService } from './users.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from "./dto/login-user.dto"
import { UpdateAccountDto } from './dto/update-account.dto';
import { UpdateSecurityDto } from "./dto/update-security.dto"

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @HttpCode(HttpStatus.CREATED)
  @Post('/register')
  async register(@Body() body: RegisterUserDto) {
    return this.usersService.register(body);
  }

  @HttpCode(HttpStatus.OK)
  @Post('/login')
  async login(@Body() body: LoginUserDto) {
    return this.usersService.login(body);
  }

  @HttpCode(HttpStatus.OK)
  @Get('/me')
  async findOne(
    @Headers('Authorization') token: string
  ) {
    return this.usersService.findOne(token);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Patch('/account')
  async updateUser(
    @Headers('Authorization') token: string,
    @Body() AccountDto: UpdateAccountDto) {
    return this.usersService.updateAccount(AccountDto, token);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Patch('/security')
  async updateSecurity(
    @Headers('Authorization') token: string,
    @Body() SecurityDto: UpdateSecurityDto) {
    return this.usersService.updateSecurity(SecurityDto, token);
  }


  @HttpCode(HttpStatus.OK)
  @Delete('/delete/:id')
  remove(@Param('id', new ParseUUIDPipe({ version: "4" })) id: string) {
    return this.usersService.removeUser(id);
  }
}
