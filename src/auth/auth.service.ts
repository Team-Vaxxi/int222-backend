import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { CreateUserDto } from "src/users/dto/createusers.dto";
import { UsersService } from "src/users/users.service";
import { LoginUserDto } from "./dto/loginuser.dto";

@Injectable()
export class AuthService{
    constructor(
        private userSerivce: UsersService,
        private jwtService: JwtService
    ) { }
    
    async   validateUser(idCard: string, password: string): Promise<any> {
        console.log(`I'm auth service`);
        const user = await this.userSerivce.findByIdCard(idCard)

        if (user  && user.password == password) {
            const { password, idCard, ...rest } = user;
            return rest
        }

        return user
    }

    async login(userDto: LoginUserDto) {
        const user = await this.userSerivce.findByIdCard(userDto.idCard)
        if (!user) throw new NotFoundException('User Not Found')

        const isPasswordValidate = await this.userSerivce.comparePassword(userDto.password, user.password)
        if (!isPasswordValidate) throw new UnauthorizedException('Wrong Password')
        
        const payload = { idCard: user.idCard, name: user.name }
        // https://auth.nuxtjs.org/schemes/local naming on property token should be the same
        return {
            access_token: this.jwtService.sign(payload),
        }
    }

    async register(userDto: CreateUserDto) {
        const user = await this.userSerivce.addUser(userDto);
        return user
    }

}