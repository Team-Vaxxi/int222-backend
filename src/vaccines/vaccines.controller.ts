import { VaccinesService } from './vaccines.service';
import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { CreateVaccineDto } from './dto/createvaccines.dto';
import { Vaccines } from './vaccines.entity';
import { UpdateVaccineDto } from './dto/updatevaccines.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Helper } from 'src/shared/helper';


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
    @UseInterceptors(FileInterceptor('image',{
        storage: diskStorage({
            destination: Helper.destinationPath,
            filename: Helper.customFileName
        })
    }))
    async addVaccine(@UploadedFile() image, @Body() createProductDto: CreateVaccineDto) {
        createProductDto.image = image.filename;
        const data = JSON.parse(createProductDto.vaccine)
        return await this.vaccinesService.addVaccine(data, createProductDto.image);
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

    @Get("images/:imagePath")
    async seeUploadFile(@Param('imagePath') image, @Res() res) {
        return res.sendFile(image, { root: './images'});
    }


}
