import "reflect-metadata";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { createConnection } from "typeorm";
import 'dotenv'
// import { User } from "./entity/User";
import { Video } from "./entity/Video";
import { createSchema } from "./createSchema";
// import { Script } from "./entity/Script";

const main = async () => {
  await createConnection({
    type: "postgres",
    database: process.env.DB_NAME,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    logging: true,
    synchronize: true,
    entities: [Video],
  });

  const app = express();

  // const RedisStore = connectRedis(session);
  // const redis = new Redis();
  // app.use(
  //   cors({
  //     origin: "http://localhost:3000",
  //     credentials: true,
  //   })
  // );
  // app.use(
  //   session({
  //     name: COOKIE_NAME,
  //     store: new RedisStore({
  //       client: redis,
  //       disableTouch: true,
  //     }),
  //     cookie: {
  //       maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years
  //       httpOnly: true,
  //       sameSite: "lax", // csrf
  //       secure: __prod__, // cookie only works in https
  //     },
  //     saveUninitialized: false,
  //     secret: "qowiueojwojfalksdjoqiwueo",
  //     resave: false,
  //   })
  // );

  const schema = await createSchema()
  const apolloServer = new ApolloServer({
    schema,
    context: ({ req, res }) => ({ req, res }),
  });

  apolloServer.applyMiddleware({
    app,
    cors: false,
  });

  app.listen(4000, () => {
    console.log("server started on localhost:4000");
  });
};

main().catch((err) => {
  console.error(err);
});