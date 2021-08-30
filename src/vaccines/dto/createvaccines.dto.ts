import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateVaccineDto {
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

// export type UpdateVaccineDTO = Partial<CreateVaccineDto>