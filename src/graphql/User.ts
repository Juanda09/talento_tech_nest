import { ObjectType, Field, ID } from "@nestjs/graphql";

@ObjectType()
export class User {
  // eslint-disable-next-line prettier/prettier
  @Field(type => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  last_name: string;

  @Field()
  email: string;

  @Field()
  age: number;

  @Field({ nullable: true })
  avatar: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
