import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import * as bcrypt from "bcryptjs";
import { UsersService } from "../users/users.service";
import { User } from "src/users/entities/user.entity";

@Injectable()
export class AuthService {
  constructor(private readonly userService: UsersService) {}

  async validateUser(email: string, password: string): Promise<User> {
    try {
      const user = await this.userService.findByEmail(email);

      if (!user) {
        throw new HttpException(
          "Usuario no encontrado",
          HttpStatus.UNAUTHORIZED,
        );
      }

      const passwordMatch = await bcrypt.compare(password, user.password);

      if (passwordMatch) {
        return user;
      } else {
        throw new HttpException(
          "Credenciales inválidas",
          HttpStatus.UNAUTHORIZED,
        );
      }
    } catch (error) {
      console.error(error);
      throw new HttpException(
        "Error de autenticación",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
