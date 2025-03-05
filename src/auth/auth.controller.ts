import { Body, Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.services";
import { RegisterDto } from "./dto/register.dto";
import { LoginDto } from "./dto/login.dto";
import { AuthGuard } from "./guard/auth.guard";
import { Request } from "express";
import { Rol } from "src/rol/rol.entity";
import { Roles } from "./decorators/roles.decorator";
import { RolesGuard } from "./guard/roles.guard";
import { Role } from "../common/enum/rol.enum";
import { Auth } from "./decorators/auth.decorator";
import { UserActiveInterface } from "src/common/interfaces/user-active.interface";
import { ActiveUser } from "../common/decorators/active-user.decorator";

interface RequestWithUser extends Request {
    user: {
        email: string;
        roles: Rol[];
    }
}



@Controller("auth")
export class AuthController {



    constructor(
        private readonly authService: AuthService
    ) {}

    @Post("register")
    register(
        @Body()
        registerDto: RegisterDto

    ) {
        console.log(registerDto);
        return this.authService.register(registerDto);
    }

    @Post("login")
    login(
        @Body()
        LoginDto: LoginDto
    ) {
        console.log(LoginDto);
        return this.authService.login(LoginDto);
    }



    @Get('profile')
    @Auth(Role.USER)
    profile(
        @ActiveUser() user: UserActiveInterface,
    ) {
        console.log(user);
        return this.authService.profile(user);
    }
}