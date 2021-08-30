import { VaccinesService } from './vaccines.service';
import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { CreateVaccineDto } from './dto/createvaccines.dto';
import { Vaccines } from './vaccines.entity';
import { UpdateVaccineDto } from './dto/updatevaccines.dto';

@Controller('vaccines')
export class VaccinesController {

    constructor(private vaccinesService: VaccinesService) {

    }

    @Get()
    async getAllVaccines(): Promise<Vaccines[]> {
        return await this.vaccinesService.findAll();
    }

    @Get("/:vaccineId")
    async getVaccineById(@Param("vaccineId") vaccineId:number): Promise<Vaccines>{
        return await this.vaccinesService.findOne(vaccineId);
    }

    @Post()
    async addVaccine(@Body() createProductDto: CreateVaccineDto) {
        return await this.vaccinesService.addVaccine(createProductDto);
    }

    @Put("/:vaccineId")
    async updateVaccineById(
        @Param('vaccineId') vaccineId: number, @Body() updateVaccineDto: UpdateVaccineDto){
        return await this.vaccinesService.updateVaccine(vaccineId, updateVaccineDto);
    }

    @Delete("/:vaccineId")
    async removeVaccineById(@Param("vaccineId") vaccineId: number) {
        return await this.vaccinesService.removeVaccine(vaccineId);
    }

}
