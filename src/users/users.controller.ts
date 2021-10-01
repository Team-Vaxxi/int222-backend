import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreateUserDto } from './dto/createusers.dto';
import { UpdateUserDto } from './dto/updateusers.dto';
import { Users } from './users.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService) {
        
    }

    @Get()
    async getAllUsers(): Promise<Users[]> {
        return await this.usersService.findAll();
    }

    @Get("/:idUser")
    async getUserById(@Param("idUser") idUser:number): Promise<Users>{
        return await this.usersService.findOne(idUser);
    }

    @Post()
    async addUser(@Body() createUserDto: CreateUserDto) {
        return await this.usersService.addUser(createUserDto);
    }

    @Put("/:idUser")
    async updateUserById(
        @Param('idUser') idUser: number, @Body() updateUserDto: UpdateUserDto){
        return await this.usersService.updateUser(idUser, updateUserDto);
    }

    @Delete("/:idUser")
    async removeUserById(@Param("idUser") idUser: number) {
        return await this.usersService.removeUser(idUser);
    }

}
