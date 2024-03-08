import { ObjectType, Field, ID } from "@nestjs/graphql";

@ObjectType()
export class House {
  @Field(() => ID)
  id: string;

  @Field()
  address: string;

  @Field()
  city: string;

  @Field()
  state: string;

  @Field()
  size: number;

  @Field()
  type: string;

  @Field()
  zip_code: string;

  @Field()
  rooms: number;

  @Field()
  bathrooms: number;

  @Field()
  parking: boolean;

  @Field()
  price: number;

  @Field()
  code: string;

  @Field()
  image: string;
}
