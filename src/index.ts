import "reflect-metadata";
import express from "express";
import session from "express-session";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { AuthResolver } from "./resolvers/AuthResolver";
import { BookResolver } from "./resolvers/BookResolver";
import { createConnection, getConnectionOptions } from "typeorm";
import { VideoResolver } from "./resolvers/VideoResolver";
import 'dotenv'

(async () => {
  const app = express();

  // const RedisStore = connectRedis(session);
  app.use(
    session({
      // store: new RedisStore({
      //   client: redis as any
      // }),
      name: "qid",
      secret: process.env.SESSION_SECRET || "aslkdfjoiq12312",
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 1000 * 60 * 60 * 24 * 1 * 365
      }
    })
  );

  const dbOptions = await getConnectionOptions(
    process.env.NODE_ENV || "development"
  );
  await createConnection({ ...dbOptions, name: "default" });

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [AuthResolver, BookResolver, VideoResolver],
      validate: false
    }),
    context: ({ req, res }) => ({ req, res })
  });

  apolloServer.applyMiddleware({ app, cors: false });
  const port = process.env.PORT || 4000;
  app.listen(port, () => {
    console.log(`server started at http://localhost:${port}/graphql`);
  });
})();
