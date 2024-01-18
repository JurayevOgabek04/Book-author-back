import { IsString, IsOptional, IsNumber } from "class-validator"

export class UpdateAccountDto {
    @IsOptional()
    @IsString()
    first_name: string

    @IsOptional()
    @IsString()
    last_name: string

    @IsOptional()
    @IsNumber()
    phone: number

}
