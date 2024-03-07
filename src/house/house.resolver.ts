import { Resolver, Query, Args } from "@nestjs/graphql";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { House } from "src/graphql/House";
import { HouseFilterInput } from "src/graphql/InputType";

@Resolver()
export class HouseResolver {
  constructor(
    @InjectModel("House") private readonly houseModel: Model<House>,
  ) {}

  @Query(() => [House])
  async HousefindAll(): Promise<House[]> {
    return this.houseModel.find().exec();
  }

  @Query(() => House)
  async HousefindOneByCode(code: string): Promise<House> {
    return this.houseModel.findOne({ code }).exec();
  }
  @Query(() => [House])
  async houseByFilter(
    @Args("filter") filter: HouseFilterInput,
  ): Promise<House[]> {
    try {
      const query: any = {};
      if (filter) {
        if (filter.state) {
          query.state = new RegExp(filter.state, "i");
        }
        if (filter.city) {
          query.city = new RegExp(filter.city, "i");
        }
        if (filter.parking !== undefined) {
          query.parking = filter.parking;
        }
        if (filter.type) {
          query.type = new RegExp(filter.type, "i");
        }
        if (filter.rooms) {
          query.rooms = filter.rooms;
        }
        if (filter.bathrooms) {
          query.bathrooms = filter.bathrooms;
        }
        if (filter.zip_code) {
          query.zip_code = new RegExp(filter.zip_code, "i");
        }
      }

      const houses = await this.houseModel.find(query); // Asume que el servicio de casa tiene un método find que toma un objeto de consulta
      return houses;
    } catch (error) {
      console.error("Error al buscar casas por filtro:", error);
      throw error;
    }
  }
}
