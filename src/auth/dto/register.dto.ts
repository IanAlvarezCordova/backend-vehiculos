import { IsEmail, IsString, Matches, MinLength } from "class-validator";

export class RegisterDto {
    @IsString()
    @Matches(/^[a-zA-Z]+\s[a-zA-Z]+$/, { message: 'Debe ingresar los 2 nombres separados por un espacio' })
    nombres: string;

    @IsString()
    @Matches(/^[a-zA-Z]+\s[a-zA-Z]+$/, { message: 'Debe ingresar los 2 apellidos separados por un espacio' })
    apellidos: string;


    @IsEmail()
    email: string;

    @IsString()
    @MinLength(5)
    password: string;

}