import { Injectable } from '@nestjs/common';
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
        const locations = await this.locationsRepository.find();
        console.log(locations);

        return locations
    }
}
