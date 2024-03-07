import { InputType, Field, Int } from "@nestjs/graphql";

@InputType()
export class UserFilterInput {
  @Field(() => String, { nullable: true })
  id?: string;

  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => String, { nullable: true })
  email?: string;

  @Field(() => String, { nullable: true })
  last_name?: string;
}

@InputType()
export class HouseFilterInput {
  @Field(() => String, { nullable: true })
  city?: string;

  @Field(() => String, { nullable: true })
  state?: string;

  @Field(() => String, { nullable: true })
  type?: string;

  @Field(() => Int, { nullable: true })
  rooms?: number;

  @Field(() => Int, { nullable: true })
  bathrooms?: number;

  @Field(() => Boolean, { nullable: true })
  parking?: boolean;

  @Field(() => String, { nullable: true })
  zip_code?: string;
}
