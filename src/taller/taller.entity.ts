import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
  } from 'typeorm';
  import { RegistroServicio } from '../registro-servicio/registro-servicio.entity';
  
  @Entity({ name: 'talleres' })
  export class Taller {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    nombre: string;
  
    @Column()
    direccion: string;
  
    @Column()
    telefono: string;
  
    @Column()
    correo: string;
  
    @Column({ nullable: true })
    horariosAtencion: string; // Puede almacenar rangos horarios o descripción
  
    @Column({ nullable: true })
    especialidades: string; // Lista o descripción de especialidades
  
    @OneToMany(() => RegistroServicio, registro => registro.taller)
    registros: RegistroServicio[];
  
    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
  }
  