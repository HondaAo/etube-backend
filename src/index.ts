import "reflect-metadata";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { BookResolver } from "./resolvers/BookResolver";
//import { createConnection, getConnectionOptions } from "typeorm";
import { VideoResolver } from "./resolvers/VideoResolver";
import { Pool } from 'pg';
import 'dotenv'

(async () => {
  const app = express();
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: true
  });
  // const RedisStore = connectRedis(session);
  // app.use(
  //   session({
  //     // store: new RedisStore({
  //     //   client: redis as any
  //     // }),
  //     name: "qid",
  //     secret: process.env.SESSION_SECRET || "aslkdfjoiq12312",
  //     resave: false,
  //     saveUninitialized: false,
  //     cookie: {
  //       httpOnly: true,
  //       secure: process.env.NODE_ENV === "production",
  //       maxAge: 1000 * 60 * 60 * 24 * 1 * 365
  //     }
  //   })
  // );
   await pool.connect()
  // const dbOptions = await getConnectionOptions(
  //   process.env.NODE_ENV || "development"
  // );
  // await createConnection({ ...dbOptions, name: "default" });

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [BookResolver, VideoResolver],
      validate: false
    }),
    context: ({ req, res }) => ({ req, res }),
    introspection: true,
    playground: true,
  });

  apolloServer.applyMiddleware({ app, cors: false });
  const port = process.env.PORT || 4000;
  app.listen(port, () => {
    console.log(`server started at http://localhost:${port}/graphql`);
  });
})();
