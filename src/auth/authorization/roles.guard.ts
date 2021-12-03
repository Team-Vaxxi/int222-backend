import {
    CanActivate,
    ExecutionContext,
    Header,
    Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES } from './ROLES';


@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) { }
    async canActivate(context: ExecutionContext) {
        const roles = this.reflector.get<string[]>('roles', context.getHandler());
        const request = context.switchToHttp().getRequest();
        const user = request.user;
        // check object user
        // console.log(user);

        if (!roles) return false;
        if (!user) return false;

        const userRole = user.role;
        // show role of user
        // console.log(userRole);

        if (userRole === ROLES.ADMIN) return true;
    }
}