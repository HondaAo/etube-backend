import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";
import { Field, Int, ObjectType } from "type-graphql";

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => String)
  @Column("text", { unique: true })
  username?: string;

  @Field(() => String)
  @Column("text", { nullable: true })
  email?: string;

  @Column("text")
  password!: string;

  @Field(() => Boolean)
  @Column("boolean",{ default: false })
  isAuth: boolean;
}
