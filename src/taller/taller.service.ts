import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Taller } from './taller.entity';

@Injectable()
export class TallerService {
  constructor(
    @InjectRepository(Taller)
    private readonly tallerRepository: Repository<Taller>,
  ) {}

  async findAll(): Promise<Taller[]> {
    // Incluye los registros de servicio asociados
    return await this.tallerRepository.find({ relations: ['registros'] });
  }

  async findOne(id: number): Promise<Taller> {
    const taller = await this.tallerRepository.findOne({
      where: { id },
      relations: ['registros'],
    });
    if (!taller) {
      throw new NotFoundException(`Taller con id ${id} no encontrado`);
    }
    return taller;
  }

  async create(taller: Partial<Taller>): Promise<Taller> {
    const nuevoTaller = this.tallerRepository.create(taller);
    return await this.tallerRepository.save(nuevoTaller);
  }

  async update(id: number, taller: Partial<Taller>): Promise<Taller> {
    await this.tallerRepository.update({ id }, taller);
    return await this.findOne(id);
  }

  async delete(id: number): Promise<void> {
    const taller = await this.findOne(id);
    await this.tallerRepository.remove(taller);
  }
}
