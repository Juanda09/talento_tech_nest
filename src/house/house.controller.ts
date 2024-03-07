import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { HouseService } from "./house.service";
import { CreateHouseDto } from "./dto/create-house.dto";
import { UpdateHouseDto } from "./dto/update-house.dto";

@Controller("house")
export class HouseController {
  constructor(private readonly houseService: HouseService) {}

  @Post()
  create(@Body() createHouseDto: CreateHouseDto) {
    return this.houseService.createHouse(createHouseDto);
  }

  @Get()
  findAll() {
    return this.houseService.getHouses();
  }

  @Get(":code")
  findOne(@Param("code") code: string) {
    return this.houseService.getHouseByCode(code);
  }

  @Patch(":code")
  update(@Param("code") code: string, updateHouseDto: UpdateHouseDto) {
    return this.houseService.updateHouseByCode(code, updateHouseDto);
  }

  @Delete(":code")
  remove(@Param("code") code: string) {
    return this.houseService.deleteHouseByCode(code);
  }
}
