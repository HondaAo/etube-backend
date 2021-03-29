import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, CreateDateColumn } from "typeorm";
import { Field, ObjectType } from "type-graphql";

export interface ScriptInterface {
  id: number,
  text: string,
  timestamp: string
}

@ObjectType()
@Entity()
export class Video extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column("text")
  category: string;

  @Field()
  @Column("text", { nullable: true })
  series?: string;

  @Field()
  @Column("text")
  title: string;

  @Field()
  @Column("text")
  url: string;

  @Field()
  @Column("text")
  script: string;

  @Field()
  @Column("int")
  view: number;

  @Field()
  @Column("int", { nullable: true })
  end: number;

  @Field()
  @Column("text", { nullable: true })
  level: string;

  @Field()
  @CreateDateColumn({ type: 'timestamp with time zone' })
  created?: Date;

}
