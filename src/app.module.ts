import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolModule } from './rol/rol.module';
import { UsuarioModule } from './usuario/usuario.module';
import { RegistroServicioModule } from './registro-servicio/registro-servicio.module';
import { TallerModule } from './taller/taller.module';
import { VehiculoModule } from './vehiculo/vehiculo.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';



@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,

    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: parseInt(process.env.POSTGRES_PORT || '5432'),
      username: process.env.POSTGRES_USERNAME,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      autoLoadEntities: true,
      synchronize: true,

      ssl: process.env.POSTGRES_SSL === 'true',
      extra: {
        ssl:
        process.env.POSTGRES_SSL === 'true'
        ? {
          rejectUnauthorized: false,
        }
        :null,
      },



  }),
  
    RolModule,
    UsuarioModule,
    VehiculoModule,
    TallerModule,
    RegistroServicioModule,
    AuthModule
  ],
})
export class AppModule {}
