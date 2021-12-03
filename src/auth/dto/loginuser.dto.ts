import { IsNotEmpty, IsString } from "class-validator";

export class LoginUserDto {
    @IsString()
    @IsNotEmpty()
    idCard: string;
    
    @IsString()
    @IsNotEmpty()
    password: string;
}