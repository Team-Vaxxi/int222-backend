import { IsNotEmpty, IsNumber, IsNumberString, IsString } from "class-validator";

export class UpdateVaccineDto {
    @IsString()
    @IsNotEmpty()
    vaccine: string;
    
    image?: string;
}