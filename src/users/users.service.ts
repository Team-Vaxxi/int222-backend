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

    async findOne(condition: any): Promise<Users> {
        const user = await this.usersRepository.findOne(condition);
        if (!user) {
            throw new NotFoundException(`User #${condition} not found`);
        }
        return user;
    }

    async findByIdCard(idCard: string): Promise<Users> {
        console.log(`I'm userService findByIdCard`);
        const user = await this.usersRepository.findOne({where: {idCard:`${idCard}`}});
        if (!user) {
            throw new NotFoundException(`User #${idCard} not found`);
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
