import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { UsuarioService } from "src/usuario/usuario.service";
import { RegisterDto } from "./dto/register.dto";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from 'bcrypt';
import { LoginDto } from "./dto/login.dto";
import { Rol } from "src/rol/rol.entity";

@Injectable()
export class AuthService {

    constructor(
        private readonly usuarioservice: UsuarioService,
        private readonly jwtService: JwtService
        ) {}


    async register({nombres, apellidos, email, password}: RegisterDto) {

        const user = await this.usuarioservice.findOneByEmail(email);

        if (user) {
            throw new BadRequestException ('Usuario ya existe');
        }

        await this.usuarioservice.create({
            nombres, 
            apellidos, 
            email, 
            password: await bcrypt.hash(password, 8),
            
        });

        return {
            nombres, 
            apellidos, 
            email,
            
        };
       
    }

    async login({email, password}: LoginDto) {
        const user = await this.usuarioservice.findByEmailWithPassword(email);

        if (!user) {
            throw new UnauthorizedException('Email es incorrecto');
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new UnauthorizedException('Contraseña es incorrecta');
        }

        const payload = { email: user.email, roles: user.roles.map(r => r.nombre) };

        const token = await this.jwtService.signAsync(payload);

        return {
            token,
            email
        };
    }

    async profile({email, roles}: {email: string, roles: Rol[]}) {
        return await this.usuarioservice.findOneByEmail(email);
    }

    



}