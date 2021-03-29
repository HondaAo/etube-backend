import { Column, BaseEntity } from "typeorm";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class Script extends BaseEntity {
  @Field()
  @Column("int")
  id: number;
  
  @Field()
  @Column("text")
  text: string;

  @Field()
  @Column("int")
  timestamp: number;
}
