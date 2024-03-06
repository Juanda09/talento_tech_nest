import { Controller, Get, Param, Post } from "@nestjs/common";
import { AppService } from "./app.service";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("hello/:name")
  getHello(@Param("name") name: string): string {
    return this.appService.getHello(name);
  }
  @Get("goodbye/:name")
  sayGoodbye(@Param("name") name: string): string {
    return this.appService.sayGoodbye(name);
  }
  @Post("hello/:name")
  postHello(@Param("name") name: string): string {
    return this.appService.getHello(name);
  }
}
