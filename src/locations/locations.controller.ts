import { Controller, Get } from '@nestjs/common';
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
}
