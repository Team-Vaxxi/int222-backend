import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vaccines } from './vaccines.entity';

@Injectable()
export class VaccinesService {
    constructor(
        @InjectRepository(Vaccines)
        private vaccinesRepository: Repository<Vaccines>,
    ) { }
    
    async findAll(): Promise<Vaccines[]> {
        const a =  await this.vaccinesRepository.find();
        console.log(a);
        return await a
    }


    async addVaccine(vaccineDTO: Partial<Vaccines>): Promise<Vaccines> {
        const vaccine = await this.vaccinesRepository.create(vaccineDTO);
        console.log(vaccine);
        
        return this.vaccinesRepository.save(vaccine);
    }
}
