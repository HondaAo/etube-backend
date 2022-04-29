import { buildSchema } from "type-graphql";
import { VideoResolver } from "./resolvers/VideoResolver";

export const createSchema = () => buildSchema({
    resolvers: [VideoResolver],
    validate: false
})