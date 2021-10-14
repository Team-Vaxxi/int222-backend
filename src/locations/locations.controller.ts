import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreateLocationDto } from './dto/createlocations.dto';
import { UpdateLocationDto } from './dto/updatelocations.dto';
import { Locations } from './locations.entity';
import { LocationsService } from './locations.service';

@Controller('locations')
export class LocationsController {
    constructor(private locationsService: LocationsService) {
        
    }

    @Get()
    async getAllLocations(): Promise<Locations[]> {
        return await this.locationsService.findAll();
    }

    @Get("/:locationId")
    async getLocationById(@Param("locationId") locationId:number): Promise<Locations> {
        return await this.locationsService.findOne(locationId);
    }

    @Post()
    async addLocation(@Body() CreateLocationDto: CreateLocationDto) {
        const data = JSON.parse(CreateLocationDto.name)
        return await this.locationsService.addLocation(data);
    }

    @Delete("/:locationId")
    async removeLocationById(@Param("locationId") idLocation: number) {
        return await this.locationsService.removeLocation(idLocation);
    }

    @Put("/:locationId")
    async updateLocationById(
        @Param('locationId') locationId: number, @Body() updateLocationDto: UpdateLocationDto){
        return await this.locationsService.updateLocation(locationId, updateLocationDto);
    }
}
