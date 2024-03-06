import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
  getHello(name): string {
    return "Hola " + name;
  }
  sayGoodbye(name): string {
    return "Adios " + name;
  }
}
