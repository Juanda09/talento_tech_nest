import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { House } from "./entities/house.entity";
import { CreateHouseDto } from "./dto/create-house.dto";
import * as colombiaData from "./Colombia_data.json";
import { UpdateHouseDto } from "./dto/update-house.dto";

@Injectable()
export class HouseService {
  constructor(
    @InjectModel("House") private readonly houseModel: Model<House>,
  ) {}

  async generarCodigo(): Promise<string> {
    const letras = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let codigo = "";

    for (let i = 0; i < 3; i++) {
      codigo += letras.charAt(Math.floor(Math.random() * letras.length));
    }

    for (let i = 0; i < 4; i++) {
      codigo += Math.floor(Math.random() * 10);
    }

    const codigoExistente = await this.houseModel
      .findOne({ code: codigo })
      .exec();

    if (codigoExistente) {
      return this.generarCodigo();
    } else {
      return codigo;
    }
  }

  async createHouse(CreateHouseDto: CreateHouseDto): Promise<House> {
    const casaExistente = await this.houseModel
      .findOne({ address: CreateHouseDto.address })
      .exec();

    if (casaExistente) {
      throw new Error("La casa ya existe.");
    }

    // Validación de estado y ciudad
    const departamento = CreateHouseDto.state.toLowerCase();
    const ciudad = CreateHouseDto.city.toLowerCase();
    const ciudadesDepartamento = colombiaData[departamento];
    if (!ciudadesDepartamento || !ciudadesDepartamento.includes(ciudad)) {
      throw new Error("La ciudad no pertenece al departamento especificado.");
    }
    const allowedTypes = ["apartment", "house"];
    if (!allowedTypes.includes(CreateHouseDto.type)) {
      throw new Error(
        'Tipo de propiedad no válido. Debe ser "apartment" o "house".',
      );
    }
    const codigo = await this.generarCodigo();

    // Validaciones adicionales aquí...

    const house = new this.houseModel({
      code: codigo,
      address: CreateHouseDto.address,
      city: CreateHouseDto.city,
      state: CreateHouseDto.state,
      size: CreateHouseDto.size,
      type: CreateHouseDto.type,
      zip_code: CreateHouseDto.zip_code,
      rooms: CreateHouseDto.rooms,
      bathrooms: CreateHouseDto.bathrooms,
      parking: CreateHouseDto.parking,
      price: CreateHouseDto.price,
    });

    return await house.save();
  }

  async getHouses(): Promise<House[]> {
    return await this.houseModel.find().exec();
  }

  async getHouseByCode(code: string): Promise<House> {
    return await this.houseModel.findOne({ code }).exec();
  }

  async updateHouseByCode(
    code: string,
    UpdateHouseDto: UpdateHouseDto,
  ): Promise<House> {
    const house = await this.houseModel.findOne({ code }).exec();
    if (!house) {
      throw new Error("La casa no existe.");
    }
    const allowedTypes = ["apartment", "house"];
    if (!allowedTypes.includes(UpdateHouseDto.type)) {
      throw new Error(
        'Tipo de propiedad no válido. Debe ser "apartment" o "house".',
      );
    }
    const departamento = UpdateHouseDto.state.toLowerCase();
    const ciudad = UpdateHouseDto.city.toLowerCase();
    const ciudadesDepartamento = colombiaData[departamento];
    if (!ciudadesDepartamento || !ciudadesDepartamento.includes(ciudad)) {
      throw new Error("La ciudad no pertenece al departamento especificado.");
    }

    return await this.houseModel
      .findOneAndUpdate({ code }, UpdateHouseDto, { new: true })
      .exec();
  }

  async deleteHouseByCode(code: string): Promise<House> {
    return await this.houseModel.findOneAndDelete({ code }).exec();
  }
}
