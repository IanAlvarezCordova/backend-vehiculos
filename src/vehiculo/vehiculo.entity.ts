import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
  } from 'typeorm';
  import { RegistroServicio } from '../registro-servicio/registro-servicio.entity.js';
  
  @Entity({name: 'vehiculo'})
  export class Vehiculo {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    marca: string;
  
    @Column()
    modelo: string;
  
    @Column()
    año: number;
  
    @Column({ unique: true })
    numeroPlaca: string;
  
    @Column()
    color: string;
  
    @Column({ type: 'enum', enum: ['automovil', 'camion', 'motocicleta'] })
    tipo: string;
  
    @Column('int')
    odometro: number;
  
    @Column({ type: 'enum', enum: ['activo', 'en mantenimiento', 'inactivo'], default: 'activo' })
    estado: string;
  
    @OneToMany(() => RegistroServicio, registro => registro.vehiculo)
    registros: RegistroServicio[];
  
    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
  }
  