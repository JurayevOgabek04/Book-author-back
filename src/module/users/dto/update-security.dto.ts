import { IsString, IsOptional, IsNumber } from "class-validator"

export class UpdateSecurityDto {
    @IsOptional()
    @IsString()
    email: string

    @IsOptional()
    @IsString()
    newPassword: string

    @IsOptional()
    @IsString()
    confirmPassword: string

}
