import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UsersService } from "src/users/users.service";

@Injectable()
export class AuthService{
    constructor(
        private userSerivce: UsersService,
        private jwtService: JwtService
    ) { }
    
    async validateUser(idCard: string, password: string): Promise<any> {
        console.log(`I'm auth service`);
        const user = await this.userSerivce.findByIdCard(idCard)

        if (user  && user.password == password) {
            const { password, idCard, ...rest } = user;
            return rest
        }

        return user
    }

    // async login(user: any) {
    //     const payload = { idUser: user.idUser, name: user.name }
    //     return {
    //         access_token: this.jwtService.sign(payload),
    //     }
    // }
}