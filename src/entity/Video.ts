import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, CreateDateColumn } from "typeorm";
import { Field, Int, ObjectType } from "type-graphql";

export interface ScriptInterface {
  id: number,
  text: string,
  timestamp: string
}

@ObjectType()
@Entity()
export class Video extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String)
  @Column("text")
  category: string;

  @Field(() => String)
  @Column("text", { nullable: true })
  series?: string;

  @Field(() => String)
  @Column("text")
  title: string;

  @Field(() => String)
  @Column("text")
  url: string;

  @Field(() => String)
  @Column("text")
  script: string;

  @Field(() => Int)
  @Column("int")
  view: number;

  @Field(() => Int)
  @Column("int", { nullable: true })
  end: number;

  @Field(() => String)
  @Column("text", { nullable: true })
  level: string;

  @Field(() => String)
  @CreateDateColumn({ type: 'timestamp with time zone' })
  created?: Date;

}
