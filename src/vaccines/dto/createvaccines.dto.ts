import { IsNotEmpty, IsNumber, IsNumberString, IsString } from "class-validator";

export class CreateVaccineDto {

    @IsString()
    @IsNotEmpty()
    vaccine: string;
    // can't used IsNumber() except IsNumberString()
    // @IsNumber()
    
    // @IsString()
    // @IsNotEmpty()
    image?: string;
}
