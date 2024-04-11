import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { User } from "./entities/user.entity";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { ApiTags } from "@nestjs/swagger";
@ApiTags("Users")
@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Get("/")
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }
  @Get("/:id")
  async findOne(@Param("id") id: string): Promise<User> {
    return this.usersService.findOne(id);
  }
  @Post("/")
  async create(@Body() CreateUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(CreateUserDto);
  }
  @Put("/:id")
  async update(
    @Param("id") id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.usersService.update(id, updateUserDto);
  }
  @Delete("/:id")
  async delete(@Param("id") id: string): Promise<any> {
    try {
      const result = await this.usersService.delete(id);
      if (result) {
        return { message: "Usuario eliminado exitosamente" };
      } else {
        return { message: "El usuario no se encontró o no pudo ser eliminado" };
      }
    } catch (error) {
      return { message: "Ocurrió un error al intentar eliminar el usuario" };
    }
  }
}
