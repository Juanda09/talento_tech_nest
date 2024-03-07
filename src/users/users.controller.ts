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
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
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
  async delete(@Param("id") id: string): Promise<User> {
    return this.usersService.delete(id);
  }
}
