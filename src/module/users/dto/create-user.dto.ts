import { IsString, IsNumber, IsNotEmpty } from "class-validator";


export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    username: string

    @IsNumber()
    @IsNotEmpty()
    userage: number

    @IsString()
    @IsNotEmpty()
    phone: string

    @IsString()
    @IsNotEmpty()
    location: string
}
