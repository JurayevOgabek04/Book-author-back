import { IsString, IsNotEmpty, IsEmail } from "class-validator";

export class LoginUserDto {
    @IsString()
    @IsEmail()
    email: string

    @IsString()
    @IsNotEmpty()
    password: string
}
