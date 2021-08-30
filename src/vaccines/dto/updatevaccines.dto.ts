import { PartialType } from "@nestjs/mapped-types";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { CreateVaccineDto } from "./createvaccines.dto";

export class UpdateVaccineDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    description: string;
    
    @IsNumber()
    @IsNotEmpty()
    price: number;
    
    @IsString()
    @IsNotEmpty()
    image: string;
}