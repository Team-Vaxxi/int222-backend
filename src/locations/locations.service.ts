import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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
        
}
