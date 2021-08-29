import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectID, Repository } from 'typeorm';
import { Vaccines } from './vaccines.entity';

@Injectable()
export class VaccinesService {
    constructor(
        @InjectRepository(Vaccines)
        private vaccinesRepository: Repository<Vaccines>,
    ) { }
    
    async findAll(): Promise<Vaccines[]> {
        const vaccines =  await this.vaccinesRepository.find();
        // console.log(vaccines);

        return vaccines;
    }

    async findOne(id: number): Promise<Vaccines> {
        const vaccine = await this.vaccinesRepository.findOne(id);
        // console.log(vaccine);
        
        return vaccine;
    }


    async addVaccine(vaccineDTO: Partial<Vaccines>): Promise<Vaccines> {
        const vaccine =  this.vaccinesRepository.create(vaccineDTO);
        console.log(vaccine);

        return this.vaccinesRepository.save(vaccine);
    }

    async removeVaccine(id: number) {
        console.log(`deleteVaccine id: ${id}`);
        
        return this.vaccinesRepository.delete(id);
    }
}
