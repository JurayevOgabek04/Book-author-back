import { IsString, IsOptional } from "class-validator"

export class UpdateUserDto {

    @IsOptional()
    @IsString()
    username: string

    @IsOptional()
    @IsString()
    userage: number

    @IsOptional()
    @IsString()
    phone: string

    @IsOptional()
    @IsString()
    location: string

}
