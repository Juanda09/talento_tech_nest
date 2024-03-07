/* eslint-disable @typescript-eslint/no-unused-vars */
import { Args, Query, Resolver } from "@nestjs/graphql";
import { User } from "../graphql/User";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { UserFilterInput } from "src/graphql/InputType";
@Resolver()
export class UsersResolver {
  constructor(@InjectModel("User") private readonly userModel: Model<User>) {}
  @Query((returns) => [User]) // Consulta para obtener todos los usuarios
  async users(): Promise<User[]> {
    return await this.userModel.find().exec();
  }

  @Query((returns) => User) // Consulta para obtener un usuario por ID
  async user(@Args("id") id: string): Promise<User> {
    return await this.userModel.findById(id).exec();
  }
  @Query(() => [User])
  async userByFilter(@Args("filter") filter: UserFilterInput): Promise<User[]> {
    try {
      const query: any = {};
      if (filter) {
        if (filter.name) {
          query.name = new RegExp(filter.name, "i");
        }
        if (filter.email) {
          query.email = new RegExp(filter.email, "i");
        }
        if (filter.last_name) {
          query.last_name = new RegExp(filter.last_name, "i");
        }
      }
      return await this.userModel.find(query); // Asume que el servicio de usuario tiene un método find que toma un objeto de consulta
    } catch (error) {
      console.error("Error al buscar usuarios por filtro:", error);
      throw error;
    }
  }
}
