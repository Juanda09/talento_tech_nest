import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from "@nestjs/common";
import { HouseService } from "./house.service";
import { CreateHouseDto } from "./dto/create-house.dto";
import { UpdateHouseDto } from "./dto/update-house.dto";
import { ApiTags } from "@nestjs/swagger";
@ApiTags("Houses")
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

  @Put(":code")
  update(@Param("code") code: string, updateHouseDto: UpdateHouseDto) {
    return this.houseService.updateHouseByCode(code, updateHouseDto);
  }

  @Delete(":code")
  remove(@Param("code") code: string) {
    return this.houseService.deleteHouseByCode(code);
  }
}
