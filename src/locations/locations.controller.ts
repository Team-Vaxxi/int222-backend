import { Controller, Get, Param } from '@nestjs/common';
import { Vaccines } from 'src/vaccines/vaccines.entity';
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
}
