import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "./entities/user.entity";
import * as bcrypt from "bcryptjs"; // Importamos bcryptjs en lugar de bcrypt
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";

@Injectable()
export class UsersService {
  constructor(@InjectModel("User") private readonly userModel: Model<User>) {}

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }
  async findOne(id: string): Promise<User> {
    return this.userModel.findById(id).exec();
  }
  async create(CreateUserDto: CreateUserDto): Promise<User> {
    const { email, password } = CreateUserDto;

    // Verificar si el correo electrónico ya está en uso
    const existingUser = await this.userModel.findOne({ email }).exec();
    if (existingUser) {
      throw new BadRequestException("El correo electrónico ya está en uso");
    }

    // Validar la contraseña
    if (!password || password.length < 6) {
      throw new BadRequestException(
        "La contraseña debe tener al menos 6 caracteres",
      );
    }

    // Encriptar la contraseña utilizando bcryptjs
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear un nuevo usuario con la contraseña encriptada
    const newUser = new this.userModel({
      ...CreateUserDto,
      password: hashedPassword,
    });

    // Guardar el nuevo usuario en la base de datos
    return await newUser.save();
  }
  async update(_id: string, updateUserDto: UpdateUserDto): Promise<User> {
    // Buscar el usuario existente por su ID
    const existingUser = await this.userModel.findById(_id).exec();
    if (!existingUser) {
      throw new NotFoundException("Usuario no encontrado");
    }

    // Actualizar los campos del usuario con los datos proporcionados en updateUserDto
    if (updateUserDto.name) {
      existingUser.name = updateUserDto.name;
    }
    if (updateUserDto.lastname) {
      existingUser.last_name = updateUserDto.lastname;
    }
    if (updateUserDto.email) {
      existingUser.email = updateUserDto.email;
    }
    if (updateUserDto.age) {
      existingUser.age = updateUserDto.age;
    }

    // Guardar los cambios en la base de datos
    await existingUser.save();

    // Devolver el usuario actualizado
    return existingUser;
  }
  async delete(_id: string): Promise<User> {
    // Buscar el usuario existente por su ID
    const existingUser = await this.userModel.findById(_id).exec();
    if (!existingUser) {
      throw new NotFoundException("Usuario no encontrado");
    }

    // Eliminar el usuario utilizando deleteOne
    const deletedUser = await this.userModel.deleteOne({ _id }).exec();

    // Verificar si se eliminó correctamente
    if (deletedUser.deletedCount === 0) {
      throw new NotFoundException("No se pudo eliminar el usuario");
    }

    // Devolver el usuario eliminado
    return existingUser;
  }
}
