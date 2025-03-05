import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
  } from 'typeorm';
  import { Vehiculo } from '../vehiculo/vehiculo.entity';
  import { Taller } from '../taller/taller.entity';
  
  @Entity({ name: 'registro_servicio' })
  export class RegistroServicio {
    @PrimaryGeneratedColumn()
    id: number;
  
    @CreateDateColumn()
    fechaServicio: Date;
  
    @Column({ nullable: true })
    descripcion: string;
  
    @Column('decimal')
    costo: number;
  
    @Column({
      type: 'enum',
      enum: ['mantenimiento preventivo', 'reparacion correctiva', 'revision tecnica'],
    })
    tipoServicio: string;
  
    @Column({ type: 'int' })
    kilometraje: number;
  
    @Column({ nullable: true })
    documentos: string; // Se puede utilizar para almacenar rutas o un JSON con archivos adjuntos
  
    @ManyToOne(() => Vehiculo, vehiculo => vehiculo.registros)
    vehiculo: Vehiculo;
  
    @ManyToOne(() => Taller, taller => taller.registros)
    taller: Taller;
  
    @UpdateDateColumn()
    updatedAt: Date;
  }
  