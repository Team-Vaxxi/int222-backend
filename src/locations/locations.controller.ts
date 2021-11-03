import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ROLES } from 'src/auth/authorization/ROLES';
import { Roles } from 'src/auth/authorization/roles.decorator';
import { RolesGuard } from 'src/auth/authorization/roles.guard';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';
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

    // @UseGuards(JwtAuthGuard, RolesGuard)
    // @Roles('role', ROLES.ADMIN)
    @Post()
    async addLocation(@Body() createLocationDto: CreateLocationDto) {
        return await this.locationsService.addLocation(createLocationDto);
    }

    // @UseGuards(JwtAuthGuard, RolesGuard)
    // @Roles('role', ROLES.ADMIN)
    @Delete("/:locationId")
    async removeLocationById(@Param("locationId") idLocation: number) {
        return await this.locationsService.removeLocation(idLocation);
    }

    // @UseGuards(JwtAuthGuard, RolesGuard)
    // @Roles('role', ROLES.ADMIN)
    @Put("/:locationId")
    async updateLocationById(
        @Param('locationId') locationId: number, @Body() updateLocationDto: UpdateLocationDto){
        return await this.locationsService.updateLocation(locationId, updateLocationDto);
    }
}
