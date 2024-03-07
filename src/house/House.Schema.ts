import * as mongoose from "mongoose";

export const HouseSchema = new mongoose.Schema({
  address: { type: String, unique: true, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  size: { type: Number, required: true },
  type: { type: String, required: true },
  zip_code: { type: String, required: true },
  rooms: { type: Number, required: true },
  bathrooms: { type: Number, required: true },
  parking: { type: Boolean, required: true },
  price: { type: Number, required: true },
  code: {
    type: String,
    unique: true, // Para asegurar que cada propiedad tenga un código único
  },
  image: { type: String },
});
