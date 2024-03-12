import { IsNotEmpty, IsString, IsEmail } from "class-validator";

export class loginDto {
  @IsEmail({}, { message: "El email proporcionado no es válido." })
  readonly email: string;

  @IsString({ message: "La contraseña debe ser una cadena de caracteres." })
  @IsNotEmpty({ message: "La contraseña no puede estar vacía." })
  readonly password: string;
}
