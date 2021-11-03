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

    @Get()
    async getAllUsers(): Promise<Users[]> {
        return await this.usersService.findAll();
    }

    @Get("/:idUser")
    async getUserById(@Param("idUser") idUser:number): Promise<Users>{
        return await this.usersService.findOne(idUser);
    }
    // Test Query IdCard
    @Get("/idCard/:idCard")
    async getUserByIdCard(@Param("idCard") idCard: string): Promise<Users>{
        return await this.usersService.findByIdCard(idCard);
    }

    @Post()
    async addUser(@Body() createUserDto: CreateUserDto) {
        return await this.usersService.addUser(createUserDto);
    }

    // @UseGuards(JwtAuthGuard, RolesGuard)
    // @Roles('role', ROLES.ADMIN)
    @Put("/:idUser")
    async updateUserById(
        @Param('idUser') idUser: number, @Body() updateUserDto: UpdateUserDto){
        return await this.usersService.updateUser(idUser, updateUserDto);
    }
    
    // @UseGuards(JwtAuthGuard, RolesGuard)
    // @Roles('role', ROLES.ADMIN)
    @Delete("/:idUser")
    async removeUserById(@Param("idUser") idUser: number) {
        return await this.usersService.removeUser(idUser);
    }

}
