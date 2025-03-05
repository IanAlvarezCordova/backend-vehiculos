import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RegistroServicio } from './registro-servicio.entity';
import { RegistroServicioService } from './registro-servicio.service';
import { RegistroServicioController } from './registro-servicio.controller';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([RegistroServicio]), AuthModule],
  controllers: [RegistroServicioController],
  providers: [RegistroServicioService],
  exports: [RegistroServicioService],
})
export class RegistroServicioModule {}
