import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RegistroServicio } from './registro-servicio.entity';
import { RegistroServicioService } from './registro-servicio.service';
import { RegistroServicioController } from './registro-servicio.controller';

@Module({
  imports: [TypeOrmModule.forFeature([RegistroServicio])],
  controllers: [RegistroServicioController],
  providers: [RegistroServicioService],
  exports: [RegistroServicioService],
})
export class RegistroServicioModule {}
