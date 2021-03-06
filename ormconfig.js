module.exports = [
   {
     name: "development",
     type: "postgres",
     username: "postgres",
     password: "postgres",
     database: "elearn",
     synchronize: true,
     logging: true,
     entities: ["src/entity/**/*.ts"],
     migrations: ["src/migration/**/*.ts"],
     subscribers: ["src/subscriber/**/*.ts"],
     cli: {
       entitiesDir: "src/entity",
       migrationsDir: "src/migration",
       subscribersDir: "src/subscriber"
     }
   },
   {
     name: "production",
     type: "postgres",
     url: process.env.DATABASE_URL,
     synchronize: true,
     logging: true,
     entities: ["dist/entity/**/*.js"],
     migrations: ["dist/migration/**/*.js"],
     subscribers: ["dist/subscriber/**/*.js"],
     cli: {
       entitiesDir: "dist/entity",
       migrationsDir: "dist/migration",
       subscribersDir: "dist/subscriber"
     },
   }
 ]