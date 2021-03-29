//import { Script } from "../entity/Script";
import { InputType, Field } from "type-graphql";

@InputType()
export class VideoInput {
  @Field()
  title: string;

  @Field()
  category: string;

  @Field()
  series: string;

  @Field()
  url: string;

  @Field()
  level: string;

  @Field()
  end: number;

  @Field(() => [ScriptInput], { nullable: true })
  scripts: ScriptInput[];
}

@InputType()
export class ScriptInput {

  @Field()
  id: number;

  @Field()
  text: string;

  @Field()
  timestamp: number;
}

@InputType()
export class likedVideo {
  @Field(() => [Number], { nullable: true })
  ids: number[];
}