import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UsersController } from "./users/users.controller";
import { UsersService } from "./users/users.service";
import { HouseController } from "./house/house.controller";
import { HouseService } from "./house/house.service";
import { UsersModule } from "./users/users.module";
import { HouseModule } from "./house/house.module";
import { MongooseModule } from "@nestjs/mongoose";
import * as dotenv from "dotenv";
dotenv.config();
@Module({
  imports: [
    UsersModule,
    HouseModule,
    MongooseModule.forRoot(process.env.DB_URL),
  ],
  controllers: [AppController, UsersController, HouseController],
  providers: [AppService, UsersService, HouseService],
})
export class AppModule {}
