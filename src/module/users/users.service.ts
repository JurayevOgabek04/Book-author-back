import { Injectable, HttpException, HttpStatus } from '@nestjs/common';

import JwtStrategy from '../../utils/utils';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from "./dto/login-user.dto"
import { UpdateAccountDto } from './dto/update-account.dto';
import { UpdateSecurityDto } from "./dto/update-security.dto";
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
  // USER REGISTER FINISHING

  // USER LOGIN START
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

  // USER LOGIN FINISHING

  // USER ME STARTING

  async findOne(token: string) {
    const userOne = JwtStrategy.verify(token)
    return await UsersEntity.findOne({
      where: {
        email: userOne.email
      }
    })
      .catch(() => {
        throw new HttpException('user not found', HttpStatus.NOT_FOUND)
      })
  }

  // USER ME FINISHING

  // USER ACCOUNT START

  async updateAccount(updateDto: UpdateAccountDto, token: string) {
    const userFind = JwtStrategy.verify(token)
    const user = await UsersEntity.findOne({
      where: {
        email: userFind.email
      }
    })
      .catch(() => {
        throw new HttpException('user not found', HttpStatus.NOT_FOUND)
      })

    await UsersEntity.createQueryBuilder()
      .update(UsersEntity)
      .set({
        firstname: updateDto.first_name ? updateDto.first_name : user.firstname,
        lastname: updateDto.last_name ? updateDto.last_name : user.lastname,
        phone: updateDto.phone ? updateDto.phone : user.phone,
      })
      .where({
        email: userFind.email
      })
      .execute()
      .catch(() => {
        throw new HttpException("BAD REQUEST", HttpStatus.BAD_REQUEST)
      })
  }

  // ACCOUNT UPDATE FINING

  // START UPDATE SECURITY

  async updateSecurity(updateDto: UpdateSecurityDto, token: string) {
    const userFind = JwtStrategy.verify(token)

    const user = await UsersEntity.findOne({
      where: {
        email: userFind.email
      }
    })
      .catch(() => {
        throw new HttpException('user not found', HttpStatus.NOT_FOUND)
      })

    if (updateDto.newPassword != updateDto.confirmPassword) {
      return {
        code: 400,
        message: "Confirm password does not match"
      }
    }

    await UsersEntity.createQueryBuilder()
      .update(UsersEntity)
      .set({
        email: updateDto.email ? updateDto.email : user.email,
        password: updateDto.newPassword ? updateDto.newPassword : user.password,

      })
      .where({
        email: userFind.email
      })
      .execute()
      .catch(() => {
        throw new HttpException("BAD REQUEST", HttpStatus.BAD_REQUEST)
      })
  }

  // USER UPDATE FINISHING

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
