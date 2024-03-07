import { Module } from "@nestjs/common";
import { HouseService } from "./house.service";
import { HouseController } from "./house.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { HouseSchema } from "./House.Schema";
import { HouseResolver } from "./house.resolver";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: "House", schema: HouseSchema }]),
  ],
  controllers: [HouseController],
  providers: [HouseService, HouseResolver],
})
export class HouseModule {}
