export class CreateHouseDto {
  readonly address: string;
  readonly city: string;
  readonly state: string;
  readonly size: number;
  readonly type: string;
  readonly zip_code: string;
  readonly rooms: number;
  readonly bathrooms: number;
  readonly parking: boolean;
  readonly price: number;
}
