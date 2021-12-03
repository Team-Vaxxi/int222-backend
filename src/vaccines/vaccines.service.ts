import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
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
    // fetch user that handle this vaccine
    return await this.vaccinesRepository.find({
      relations: ['user', 'locations'],
    });

    // return await this.vaccinesRepository.find();
  }

  async findOne(vaccineId: number): Promise<Vaccines> {
    const vaccine = await this.vaccinesRepository.findOne(vaccineId);
    if (!vaccine) {
      throw new NotFoundException(`Vaccine #${vaccineId} not found`);
    }
    return vaccine;
  }

  // write exception
  async addVaccine(vaccineDto: Vaccines, imageName: string) {
    const vaccineNameIsExist = await this.vaccinesRepository.findOne({ where: { name: `${vaccineDto.name}` } })
    if (vaccineNameIsExist) {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: 'This vaccine name is already exist.'
      }, HttpStatus.BAD_REQUEST)
    }
    const newVaccine = this.vaccinesRepository.create(vaccineDto);
    newVaccine.image = imageName;
    // console.log(newVaccine.locations);

    return this.vaccinesRepository.save(newVaccine);
  }

  async updateVaccine(vaccineId: number, updateVaccineDto: Vaccines, imageName: string) {
    const vaccine = await this.vaccinesRepository.findOne(vaccineId);
    if (!vaccine) {
      throw new NotFoundException(`Vaccine #${vaccineId} not found`);
    }
    const vaccineNameIsExist = await this.vaccinesRepository.findOne({ where: { name: `${updateVaccineDto.name}` } })
    // vaccineNameIsExist but same vaccine
    if (vaccine.name == updateVaccineDto.name) {
      updateVaccineDto.image = imageName
      Object.assign(vaccine, updateVaccineDto)
      return await this.vaccinesRepository.save(vaccine);
    }
    // vaccineNameIsExsit but didn't same vaccine
    if (vaccineNameIsExist) {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: 'This vaccine name is already exist.'
    }, HttpStatus.BAD_REQUEST)
    }


  }

  async removeVaccine(vaccineId: number) {
    const vaccine = await this.vaccinesRepository.findOne(vaccineId);
    if (!vaccine) {
      throw new NotFoundException(`Vaccine #${vaccineId} not found`);
    }
    return this.vaccinesRepository.delete(vaccineId);
  }
}
