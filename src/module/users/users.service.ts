import { Injectable, HttpException, HttpStatus } from '@nestjs/common';

import JwtStrategy from '../../utils/utils';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from "./dto/login-user.dto"
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersEntity } from '../../entities/users.entity';

@Injectable()
export class UsersService {
  async register(badyDto: RegisterUserDto): Promise<any> {

    const findUser = await UsersEntity.findOne({
      where: {
        email: badyDto.email
      }
    })

    if (findUser) {
      return "User olin ro'yxatdan O'tgan"
    }

    const newUser = await UsersEntity.createQueryBuilder()
      .insert()
      .into(UsersEntity)
      .values({
        firstname: badyDto.first_name,
        lastname: badyDto.last_name,
        phone: badyDto.phone,
        email: badyDto.email,
        password: badyDto.password

      })
      .returning(['email'])
      .execute()
      .catch(() => {
        throw new HttpException('Bad request', HttpStatus.BAD_REQUEST)
      })

    const token = JwtStrategy.sign({ email: newUser.raw[0]?.email })

    return {
      code: 200,
      access_token: token
    }
  }

  async login(bodyDto: LoginUserDto): Promise<any> {
    const user = await UsersEntity.findOne({
      where: {
        email: bodyDto.email
      }
    })

    if (!user) {
      return {
        code: 404,
        message: "You are not registered"
      }
    } else if (user.password !== bodyDto.password) {
      return {
        code: 400,
        message: "Your password is not correct"
      }
    }

    const token = JwtStrategy.sign({ email: user.email })

    return {
      code: 200,
      access_token: token
    }

  }

  async findOne(id: string) {
    return await UsersEntity.findOne({
      where: {
        userId: id
      }
    })
  }

  async updateUser(id: string, updateDto: UpdateUserDto) {
    const user = await UsersEntity.findOne({
      where: {
        userId: id
      }
    })
      .catch(() => {
        throw new HttpException('user not found', HttpStatus.NOT_FOUND)
      })

    await UsersEntity.createQueryBuilder()
      .update(UsersEntity)
      .set({
        // username: updateDto.username ? updateDto.username : user.username,
        // userage: updateDto.userage ? updateDto.userage : user.userage,
        // phone: updateDto.phone ? updateDto.phone : user.phone,
        // location: updateDto.location ? updateDto.location : user.location
      })
      .where({
        userId: id
      })
      .execute()
      .catch(() => {
        throw new HttpException("BAD REQUEST", HttpStatus.BAD_REQUEST)
      })
  }

  async removeUser(id: string) {
    await UsersEntity
      .createQueryBuilder()
      .delete()
      .from(UsersEntity)
      .where({ userId: id })
      .execute()
      .catch(() => {
        throw new HttpException("Bad REquest", HttpStatus.BAD_REQUEST)
      })
  }
}
