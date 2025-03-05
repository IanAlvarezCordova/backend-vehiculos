import { Controller, Get, Post, Put, Delete, Param, Body, ParseIntPipe } from '@nestjs/common';
import { RegistroServicioService } from './registro-servicio.service';
import { RegistroServicio } from './registro-servicio.entity';

@Controller('registro-servicio')
export class RegistroServicioController {
  constructor(private readonly registroServicioService: RegistroServicioService) {}

  @Get()
  async findAll(): Promise<RegistroServicio[]> {
    return await this.registroServicioService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<RegistroServicio> {
    return await this.registroServicioService.findOne(id);
  }

  @Post()
  async create(@Body() registro: Partial<RegistroServicio>): Promise<RegistroServicio> {
    return await this.registroServicioService.create(registro);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() registro: Partial<RegistroServicio>
  ): Promise<RegistroServicio> {
    return await this.registroServicioService.update(id, registro);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return await this.registroServicioService.delete(id);
  }
}
