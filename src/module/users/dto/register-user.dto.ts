import { IsString, IsNumber, IsNotEmpty, IsEmail, Validate } from "class-validator";
import { Unique } from "typeorm";


export class RegisterUserDto {
    @IsString()
    @IsNotEmpty()
    first_name: string

    @IsString()
    @IsNotEmpty()
    last_name: string

    @IsNumber()
    @IsNotEmpty()
    phone: number

    @IsString()
    @IsEmail()
    email: string

    @IsString()
    @IsNotEmpty()
    password: string
}
