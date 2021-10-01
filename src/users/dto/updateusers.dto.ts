import { IsDateString, IsNotEmpty, IsNumber, IsNumberString, IsString } from "class-validator";

export class UpdateUserDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    surname: string;
    
    @IsString()
    @IsNotEmpty()
    gender: string;

    @IsString()
    @IsNotEmpty()
    address: string;
  
    @IsDateString()
    @IsNotEmpty()
    dob: string;

    @IsString()
    @IsNotEmpty()
    tel: string;
    
    @IsString()
    @IsNotEmpty()
    idCard: string;
    
    @IsString()
    @IsNotEmpty()
    password: string;
    
    @IsString()
    @IsNotEmpty()
    role: string;
    
    @IsNumberString()
    isOrder: string;

}