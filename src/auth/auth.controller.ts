import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { loginDto } from "./dto/login.dto";
import { ApiTags } from "@nestjs/swagger";
@ApiTags("Auth")
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post("login")
  async login(@Body() LoginDto: loginDto): Promise<any> {
    return this.authService.validateUser(LoginDto.email, LoginDto.password);
  }
}
