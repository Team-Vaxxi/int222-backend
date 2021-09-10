import { VaccinesService } from './vaccines.service';
import { Body, Controller, Delete, Get, Param, Patch, Post, Put, UploadedFile, UseInterceptors } from '@nestjs/common';
import { CreateVaccineDto } from './dto/createvaccines.dto';
import { Vaccines } from './vaccines.entity';
import { UpdateVaccineDto } from './dto/updatevaccines.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { of } from 'rxjs';


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

// must to do: imagename with vaccineId
// generate name vaccineId by back-end
    @Post("upload")
    @UseInterceptors(FileInterceptor('file', {
        dest: './uploads'
    }))
    async uploadFile(@UploadedFile() file) {
        console.log(file);
        return of({ imagePath: file.filename });
    }



}
