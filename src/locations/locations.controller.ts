import { Body, Controller, Get, Param, Put } from '@nestjs/common';
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

    @Put("/:locationId")
    async updateLocationById(
        @Param('locationId') locationId: number, @Body() updateLocationDto: UpdateLocationDto){
        return await this.locationsService.updateLocation(locationId, updateLocationDto);
    }
}
