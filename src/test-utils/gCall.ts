import { graphql, GraphQLSchema } from "graphql"
import { createSchema } from "../createSchema"

interface Options {
    source: string
    variableValues?: any
}

let schema: GraphQLSchema;

export const gCall = async({
    source, 
    variableValues
}: Options) => {
    if(!schema){
        schema = await createSchema()
    }
    return graphql({
        schema,
        source,
        variableValues 
    })
}