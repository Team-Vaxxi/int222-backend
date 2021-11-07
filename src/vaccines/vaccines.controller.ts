import { VaccinesService } from './vaccines.service';
import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { CreateVaccineDto } from './dto/createvaccines.dto';
import { Vaccines } from './vaccines.entity';
import { UpdateVaccineDto } from './dto/updatevaccines.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Helper } from 'src/shared/helper';
import { Roles } from 'src/auth/authorization/roles.decorator';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';
import { ROLES } from 'src/auth/authorization/ROLES';
import { RolesGuard } from 'src/auth/authorization/roles.guard';


@Controller('vaccines')
export class VaccinesController {

    constructor(private vaccinesService: VaccinesService) {

    }

    @UseGuards(JwtAuthGuard)
    @Get()
    async getAllVaccines(): Promise<Vaccines[]> {
        return await this.vaccinesService.findAll();
    }

    @UseGuards(JwtAuthGuard)
    @Get("/:vaccineId")
    async getVaccineById(@Param("vaccineId") vaccineId:number): Promise<Vaccines>{
        return await this.vaccinesService.findOne(vaccineId);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('role', ROLES.ADMIN)
    @Post()
    @UseInterceptors(FileInterceptor('image',{
        storage: diskStorage({
            destination: Helper.destinationPath,
            filename: Helper.customFileName
        })
    }))
    async addVaccine(@UploadedFile() image, @Body() createProductDto: CreateVaccineDto) {
        createProductDto.image = image.filename;
        const data = JSON.parse(createProductDto.vaccine) as Vaccines
        return await this.vaccinesService.addVaccine(data, createProductDto.image);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('role', ROLES.ADMIN)
    @Put('/:vaccineId')
    @UseInterceptors(FileInterceptor('image',{
        storage: diskStorage({
            destination: Helper.destinationPath,
            filename: Helper.customFileName
        })
    }))
    async updateVaccineById(
        @Param('vaccineId') vaccineId: number, @UploadedFile() image, @Body() updateVaccineDto: UpdateVaccineDto) {
        updateVaccineDto.image = image.filename
        const data = JSON.parse(updateVaccineDto.vaccine) as Vaccines
        // console.log(data);
        return await this.vaccinesService.updateVaccine(vaccineId, data, updateVaccineDto.image);
    }
    
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('role', ROLES.ADMIN)
    @Delete("/:vaccineId")
    async removeVaccineById(@Param("vaccineId") vaccineId: number) {
        return await this.vaccinesService.removeVaccine(vaccineId);
    }

    @Get("images/:imagePath")
    async seeUploadFile(@Param('imagePath') image, @Res() res) {
        return res.sendFile(image, { root: './images'});
    }


}
