import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { GraphQLModule } from "@nestjs/graphql";
import * as dotenv from "dotenv";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UsersModule } from "./users/users.module";
import { HouseModule } from "./house/house.module";
import { join } from "path";
import { YogaDriver, YogaDriverConfig } from "@graphql-yoga/nestjs";

dotenv.config();

@Module({
  imports: [
    MongooseModule.forRoot(process.env.DB_URL),
    UsersModule,
    HouseModule,
    GraphQLModule.forRoot<YogaDriverConfig>({
      driver: YogaDriver,
      autoSchemaFile: join(process.cwd(), "src/schema.gql"),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
