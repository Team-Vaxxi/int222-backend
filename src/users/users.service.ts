import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/createusers.dto';
import { UpdateUserDto } from './dto/updateusers.dto';
import { Users } from './users.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(Users)
        private usersRepository: Repository<Users>,
    ) { }
    
    async findAll(): Promise<Users[]> {
        return await this.usersRepository.find();
    }

    async findOne(idUser: number): Promise<Users> {
        const user = await this.usersRepository.findOne(idUser);
        if (!user) {
            throw new NotFoundException(`User #${idUser} not found`);
        }
        return user;
    }

    async addUser(userDto: CreateUserDto) {
        return this.usersRepository.save(this.usersRepository.create(userDto));
    }

    async updateUser(idUser: number, updateUserDto: UpdateUserDto) {
        const user = await this.usersRepository.findOne(idUser);
        if (!user) {
            throw new NotFoundException(`User #${idUser} not found`);
        }
        return this.usersRepository.update(idUser, updateUserDto);
    }

    async removeUser(idUser: number) {
        const user = await this.usersRepository.findOne(idUser);
        if (!user) {
            throw new NotFoundException(`User #${idUser} not found`);
        }
        return this.usersRepository.delete(idUser);
    }

}
