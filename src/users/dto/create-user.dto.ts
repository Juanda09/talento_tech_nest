import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  Matches,
} from "class-validator";

export class CreateUserDto {
  @IsString({ message: "El nombre debe ser una cadena de caracteres." })
  @Length(2, 50, { message: "El nombre debe tener entre 2 y 50 caracteres." })
  readonly name: string;

  @IsEmail({}, { message: "El email proporcionado no es válido." })
  readonly email: string;

  @IsString({ message: "La contraseña debe ser una cadena de caracteres." })
  @IsNotEmpty({ message: "La contraseña no puede estar vacía." })
  @Length(6, 20, {
    message: "La contraseña debe tener entre 6 y 20 caracteres.",
  })
  @Matches(/^(?=.*[A-Z])(?=.*[!@#$%^&*]).{6,20}$/, {
    message:
      "La contraseña debe contener al menos una letra mayúscula y un carácter especial.",
  })
  readonly password: string;

  readonly avatar: string;

  @IsString({ message: "El apellido debe ser una cadena de caracteres." })
  @Length(2, 50, { message: "El apellido debe tener entre 2 y 50 caracteres." })
  readonly lastname: string;

  readonly age: number;
}
