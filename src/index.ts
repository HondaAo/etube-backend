import "reflect-metadata";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { createConnection } from "typeorm";
import 'dotenv'
import { User } from "./entity/User";
import { Video } from "./entity/Video";
import { createSchema } from "./createSchema";
import { Script } from "./entity/Script";

// (async () => {
//   const app = express();
//   // const pool = new Pool({
//   //   connectionString: process.env.DATABASE_URL,
//   //   ssl: true
//   // });
//   // const RedisStore = connectRedis(session);
//   // app.use(
//   //   session({
//   //     // store: new RedisStore({
//   //     //   client: redis as any
//   //     // }),
//   //     name: "qid",
//   //     secret: process.env.SESSION_SECRET || "aslkdfjoiq12312",
//   //     resave: false,
//   //     saveUninitialized: false,
//   //     cookie: {
//   //       httpOnly: true,
//   //       secure: process.env.NODE_ENV === "production",
//   //       maxAge: 1000 * 60 * 60 * 24 * 1 * 365
//   //     }
//   //   })
//   // );
//   //  await pool.connect()
//   // const dbOptions = await getConnectionOptions(
//   //   process.env.NODE_ENV || "development"
//   // );
//   await createConnection({
//      name: "default",
//      url: process.env.DATABASE_URL,
//      type: 'postgres',
//      entities: ["dist/entity/**/*.js"],
//      synchronize: true,
//   });
//   app.use(cors())
//   const apolloServer = new ApolloServer({
//     schema: await buildSchema({
//       resolvers: [BookResolver, VideoResolver],
//       validate: false
//     }),
//     context: ({ req, res }) => ({ req, res }),
//     introspection: true,
//     playground: true,
//   });

//   apolloServer.applyMiddleware({ app, cors: false });
//   const port = process.env.PORT || 4000;
//   app.listen(port, () => {
//     console.log(`server started at http://localhost:${port}/graphql`);
//   });
// })();

const main = async () => {
  await createConnection({
    type: "postgres",
    database: "elearn",
    username: "postgres",
    password: "postgres",
    logging: true,
    synchronize: true,
    entities: [User, Script, Video],
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