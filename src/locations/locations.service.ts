import { Body, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateLocationDto } from './dto/createlocations.dto';
import { UpdateLocationDto } from './dto/updatelocations.dto';
import { Locations } from './locations.entity';

@Injectable()
export class LocationsService {
    constructor(
        @InjectRepository(Locations)
        private locationsRepository: Repository<Locations>,
    ) { }
    
    async findAll(): Promise<Locations[]> {
        return await this.locationsRepository.find();
    }

    async findOne(locationId: number): Promise<Locations> {
        const location = await this.locationsRepository.findOne(locationId);
        if (!location) {
            throw new NotFoundException(`Location #${locationId} not found`);
        }
        return location;
    }

    async addLocation(locationDto: CreateLocationDto) {
        const locationNameIsExist = await this.locationsRepository.findOne({ where: { name: `${locationDto.name}` } })
        if (locationNameIsExist) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: 'This location name is already exist.'
            }, HttpStatus.BAD_REQUEST)
        }
        return this.locationsRepository.save(this.locationsRepository.create(locationDto));
    }
    
    async removeLocation(idLocation: number) {
        const location = await this.locationsRepository.findOne(idLocation)
        if (!location) {
            throw new NotFoundException(`Location #${idLocation} not found`);
        }
        return this.locationsRepository.delete(idLocation);
    }


    async updateLocation(locationId: number, updateLocationDto: UpdateLocationDto) {
        const location = await this.locationsRepository.findOne(locationId);
        if (!location) {
            throw new NotFoundException(`Location #${locationId} not found`);
        }
        return this.locationsRepository.update(locationId, updateLocationDto);
    }
        
}
