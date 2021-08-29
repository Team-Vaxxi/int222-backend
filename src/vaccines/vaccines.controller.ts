import { VaccinesService } from './vaccines.service';
import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { Vaccines } from './vaccines.entity';

@Controller('/vaccines')
export class VaccinesController {

    constructor(private vaccinesService: VaccinesService) {

    }

    @Get()
    async getAllVaccines(): Promise<Vaccines[]> {
        return await this.vaccinesService.findAll();
    }


    @Post()
    async addVaccine(@Body("name") name: string,
        @Body("description") description: string,
        @Body("price") price: number,
        @Body("image") image:string) {
        return this.vaccinesService.addVaccine({ name, description, price, image});

    }

    @Delete("/:id")
    deleteVaccineById(@Param("id") id: string) {
        console.log(`id: ${id}`);
        return `id: ${id}`

    }

}
