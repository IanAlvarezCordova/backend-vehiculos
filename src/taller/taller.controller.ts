import { Controller, Get, Post, Put, Delete, Param, Body, ParseIntPipe, HttpCode } from '@nestjs/common';
import { TallerService } from './taller.service';
import { Taller } from './taller.entity';
import { Auth } from "src/auth/decorators/auth.decorator";
import { Role } from "src/common/enum/rol.enum";

@Controller('taller')
export class TallerController {
  constructor(private readonly tallerService: TallerService) {}

  @Get()
  async findAll(): Promise<Taller[]> {
    return await this.tallerService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Taller> {
    return await this.tallerService.findOne(id);
  }

  @Post()
  async create(@Body() taller: Partial<Taller>): Promise<Taller> {
    return await this.tallerService.create(taller);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() taller: Partial<Taller>
  ): Promise<Taller> {
    return await this.tallerService.update(id, taller);
  }

  @Auth(Role.ADMIN)
  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return await this.tallerService.delete(id);
  }
}
