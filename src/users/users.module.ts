import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { UserSchema } from "./User.Schema";
import { UsersResolver } from "./users.resolver";

@Module({
  imports: [MongooseModule.forFeature([{ name: "User", schema: UserSchema }])],
  controllers: [UsersController],
  providers: [UsersService, UsersResolver],
})
export class UsersModule {}
