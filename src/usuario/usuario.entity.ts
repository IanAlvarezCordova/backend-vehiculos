import { Rol } from 'src/rol/rol.entity';
import { Column, CreateDateColumn, Entity, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity({name: 'usuario'})
export class Usuario {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombres: string;

    @Column()
    apellidos: string;

    //Primera letra de los 2 nombres y apellido si se repite el username aumentamos un numero
    @Column({unique: true})
    username: string;


    @Column({unique: true})
    email: string;

    @Column({select: false})
    password: string;


    @CreateDateColumn()
    fechaCreacion: Date;

    @UpdateDateColumn()
    fechaActualizacion: Date;

    @ManyToMany(() => Rol, rol => rol.usuarios, { cascade: ['remove'], onDelete: 'CASCADE' })
    roles: Rol[];
}