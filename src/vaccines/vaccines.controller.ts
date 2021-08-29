import { VaccinesService } from './vaccines.service';
import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { Vaccines } from './vaccines.entity';

@Controller('vaccines')
export class VaccinesController {

    constructor(private vaccinesService: VaccinesService) {

    }

    @Get()
    async getAllVaccines(): Promise<Vaccines[]> {
        return await this.vaccinesService.findAll();
    }

    @Get("/:id")
    async getVaccine(@Param("id") id:number): Promise<Vaccines>{
        return await this.vaccinesService.findOne(id);
    }

    // todo: deal with genereated PK
    @Post()
    async addVaccine(
        // @Body("idVaccine") idVaccine: number,
        @Body("name") name: string,
        @Body("description") description: string,
        @Body("price") price: number,
        @Body("image") image: string) {
        return await this.vaccinesService.addVaccine({ name, description, price, image});

    }

    // todo: check methods 
    @Delete("/:id")
    async removeVaccineById(@Param("id") id: number) {
        return await this.vaccinesService.removeVaccine(id);
    }

}
