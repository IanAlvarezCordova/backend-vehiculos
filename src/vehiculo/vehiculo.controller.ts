import { Controller, Get, Post, Put, Delete, Param, Body, ParseIntPipe, HttpCode } from '@nestjs/common';
import { VehiculoService } from './vehiculo.service';
import { Vehiculo } from './vehiculo.entity';
import { Auth } from "src/auth/decorators/auth.decorator";
import { Role } from "src/common/enum/rol.enum";

@Controller('vehiculo')
export class VehiculoController {
  constructor(private readonly vehiculoService: VehiculoService) {}

  @Get()
  async findAll(): Promise<Vehiculo[]> {
    return await this.vehiculoService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Vehiculo> {
    return await this.vehiculoService.findOne(id);
  }

  @Post()
  async create(@Body() vehiculo: Partial<Vehiculo>): Promise<Vehiculo> {
    return await this.vehiculoService.create(vehiculo);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() vehiculo: Partial<Vehiculo>
  ): Promise<Vehiculo> {
    return await this.vehiculoService.update(id, vehiculo);
  }


  @Auth(Role.ADMIN)
  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return await this.vehiculoService.delete(id);
  }
}
