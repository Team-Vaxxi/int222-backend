import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateVaccineDto } from './dto/createvaccines.dto';
import { Repository } from 'typeorm';
import { Vaccines } from './vaccines.entity';
import { UpdateVaccineDto } from './dto/updatevaccines.dto';

@Injectable()
export class VaccinesService {
    constructor(
        @InjectRepository(Vaccines)
        private vaccinesRepository: Repository<Vaccines>,
    ) {}

    async findAll(): Promise<Vaccines[]> {
        // fetch user that handle this vaccine
        // return await this.vaccinesRepository.find({relations:['user']});

        return await this.vaccinesRepository.find();
    }

    async findOne(vaccineId: number): Promise<Vaccines> {
        const vaccine = await this.vaccinesRepository.findOne(vaccineId);
        if (!vaccine) {
            throw new NotFoundException(`Vaccine #${vaccineId} not found`);
        }
        return vaccine;
    }

    async addVaccine(vaccineDto: CreateVaccineDto): Promise<Vaccines> {
        return this.vaccinesRepository.save(this.vaccinesRepository.create(vaccineDto));
    }

    async updateVaccine(vaccineId: number, updateVaccineDto: UpdateVaccineDto) {
        const vaccine = await this.vaccinesRepository.findOne(vaccineId);
        if (!vaccine) {
            throw new NotFoundException(`Vaccine #${vaccineId} not found`);
        }
        return this.vaccinesRepository.update(vaccineId, updateVaccineDto);
    }

    async removeVaccine(vaccineId: number) {
        const vaccine = await this.vaccinesRepository.findOne(vaccineId);
        if (!vaccine) {
            throw new NotFoundException(`Vaccine #${vaccineId} not found`);
        }
        return this.vaccinesRepository.delete(vaccineId);
    }
}
