import { Column, BaseEntity } from "typeorm";
import { Field, Int, ObjectType } from "type-graphql";

@ObjectType()
export class Script extends BaseEntity {
  @Field(() => Int)
  @Column("int")
  id: number;
  
  @Field(() => String)
  @Column("text")
  text: string;

  @Field(() => String)
  @Column("int")
  timestamp: number;
}
