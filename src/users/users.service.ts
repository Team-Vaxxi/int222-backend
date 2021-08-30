import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './users.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(Users)
        private usersRepository: Repository<Users>,
    ) { }
    
    async findAll(): Promise<Users[]> {
        const users = await this.usersRepository.find();
        // console.log(users);

        return users;
    }

}
