import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vehiculo } from './vehiculo.entity';

@Injectable()
export class VehiculoService {
  constructor(
    @InjectRepository(Vehiculo)
    private readonly vehiculoRepository: Repository<Vehiculo>,
  ) {}

  async findAll(): Promise<Vehiculo[]> {
    // Incluye los registros de servicio asociados para ver el historial
    return await this.vehiculoRepository.find({ relations: ['registros'] });
  }

  async findOne(id: number): Promise<Vehiculo> {
    const vehiculo = await this.vehiculoRepository.findOne({
      where: { id },
      relations: ['registros'],
    });
    if (!vehiculo) {
      throw new NotFoundException(`Vehículo con id ${id} no encontrado`);
    }
    return vehiculo;
  }

  async create(vehiculo: Partial<Vehiculo>): Promise<Vehiculo> {
    const nuevoVehiculo = this.vehiculoRepository.create(vehiculo);
    return await this.vehiculoRepository.save(nuevoVehiculo);
  }

  async update(id: number, vehiculo: Partial<Vehiculo>): Promise<Vehiculo> {
    await this.vehiculoRepository.update({ id }, vehiculo);
    return await this.findOne(id);
  }

  async delete(id: number): Promise<void> {
    const vehiculo = await this.findOne(id);
    await this.vehiculoRepository.remove(vehiculo);
  }
}
