import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RegistroServicio } from './registro-servicio.entity';

@Injectable()
export class RegistroServicioService {
  constructor(
    @InjectRepository(RegistroServicio)
    private readonly registroServicioRepository: Repository<RegistroServicio>,

    
  ) {}

  async findAll(): Promise<RegistroServicio[]> {
    // Se incluyen las relaciones con Vehículo y Taller para el historial completo
    return await this.registroServicioRepository.find({ relations: ['vehiculo', 'taller'] });
  }

  async findOne(id: number): Promise<RegistroServicio> {
    const registro = await this.registroServicioRepository.findOne({
      where: { id },
      relations: ['vehiculo', 'taller'],
    });
    if (!registro) {
      throw new NotFoundException(`Registro de servicio con id ${id} no encontrado`);
    }
    return registro;
  }

  async create(registro: Partial<RegistroServicio>): Promise<RegistroServicio> {
    const nuevoRegistro = this.registroServicioRepository.create(registro);
    return await this.registroServicioRepository.save(nuevoRegistro);
  }

  async update(id: number, registro: Partial<RegistroServicio>): Promise<RegistroServicio> {
    await this.registroServicioRepository.update({ id }, registro);
    return await this.findOne(id);
  }

  async delete(id: number): Promise<void> {
    const registro = await this.findOne(id);
    await this.registroServicioRepository.remove(registro);
  }
}
