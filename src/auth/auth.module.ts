import { Module } from "@nestjs/common";
import { AuthService } from "./auth.services";
import { AuthController } from "./auth.controller";
import { UsuarioModule } from "src/usuario/usuario.module";
import { JwtModule } from "@nestjs/jwt";
import { jwkConstants } from "./constants/jwk.constant";
import { RolModule } from "src/rol/rol.module";

@Module({
    imports: [
        UsuarioModule,
        RolModule,
        JwtModule.register({
          global: true,
          secret: jwkConstants.secret,
          signOptions: { expiresIn: '1d' },
        }),
    ],
    providers: [AuthService],
    controllers: [AuthController],
    exports: [AuthService]
})
export class AuthModule {}