import { Controller, Post, UseGuards, Body, Req, Get } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/createusers.dto';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/loginuser.dto';
import { JwtAuthGuard } from './jwt.auth.guard';
import { Request } from 'express';
import { Users } from 'src/users/users.entity';

@Controller('auth')
export class AuthController {

    constructor(
        private autherService: AuthService,
    ){}

    @Post('login')
    async login(@Body() loginUserDto: LoginUserDto) {
        return await this.autherService.login(loginUserDto);
    }

    @Post('register')
    async register(
        @Body() createUserDto: CreateUserDto) {
        return await this.autherService.register(createUserDto)
    }

    // sent to front-end
    @UseGuards(JwtAuthGuard)
    @Get('me')
    async getMe(@Req() req: Request) {
        const user = req.user as Users
        // delete value from object but didn't delete on DB
        delete user.password
        return { user:user }
    }
    
}
