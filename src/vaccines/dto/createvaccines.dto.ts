import { IsNotEmpty, IsNumber, IsNumberString, IsString } from "class-validator";

export class CreateVaccineDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    description: string;
    // can't used IsNumber() except IsNumberString()
    // @IsNumber()
    @IsNotEmpty()
    price: number;
    
    // form-data มีปัญหา
    // @IsString()
    // @IsNotEmpty()
    image: string;
}