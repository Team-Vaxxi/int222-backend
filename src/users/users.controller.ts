import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ROLES } from 'src/auth/authorization/ROLES';
import { Roles } from 'src/auth/authorization/roles.decorator';
import { RolesGuard } from 'src/auth/authorization/roles.guard';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';
import { CreateUserDto } from './dto/createusers.dto';
import { UpdateUserDto } from './dto/updateusers.dto';
import { Users } from './users.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService) {
        
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('role', ROLES.ADMIN)
    @Get()
    async getAllUsers(): Promise<Users[]> {
        return await this.usersService.findAll();
    }
    // Register
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('role', ROLES.ADMIN)
    @Get("/:idUser")
    async getUserById(@Param("idUser") idUser:number): Promise<Users>{
        return await this.usersService.findOne(idUser);
    }
    // Register
    @Post()
    async addUser(@Body() createUserDto: CreateUserDto) {
        return await this.usersService.addUser(createUserDto);
    }

    // Update users by ADMIN
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('role', ROLES.ADMIN)
    @Put("/:idUser")
    async updateUserById(
        @Param('idUser') idUser: number, @Body() updateUserDto: UpdateUserDto){
        return await this.usersService.updateUser(idUser, updateUserDto);
    }

    // Update only Vaccine for USER
    @UseGuards(JwtAuthGuard)
    @Put("add/:idUser")
    async updateVaccineUser(
        @Param('idUser') idUser: number, @Body() updateUserDto: UpdateUserDto){
        return await this.usersService.updateVaccineUser(idUser, updateUserDto);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('role', ROLES.ADMIN)
    @Delete("/:idUser")
    async removeUserById(@Param("idUser") idUser: number) {
        return await this.usersService.removeUser(idUser);
    }

}
