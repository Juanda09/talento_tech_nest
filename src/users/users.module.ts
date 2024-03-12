import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { UserSchema } from "./User.Schema";
import { UsersResolver } from "./users.resolver";
import { AuthService } from "src/auth/auth.service";
import { AuthController } from "src/auth/auth.controller";

@Module({
  imports: [MongooseModule.forFeature([{ name: "User", schema: UserSchema }])],
  controllers: [UsersController, AuthController],
  providers: [UsersService, UsersResolver, AuthService],
})
export class UsersModule {}
