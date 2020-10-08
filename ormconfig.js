  console.log("process.env.DATABASE_URL >>> ", process.env.DATABASE_URL)
  module.exports = {
    "type": "postgres",
    "url": process.env.DATABASE_URL,
    "entities": [
      "dist/models/*.js"
   ],
   "migrations": [
    "dist/database/migrations/**/*.js"
  ],
   "cli":{
    "migrationsDir": [
      "src/database/migrations/"
    ],
    "entitiesDir": "src/models"
    }
  }

// module.exports = {
//   "type": "postgres",
//   "url": process.env.DATABASE_URL,
//   "entities": [
//     "./src/models/*.ts"
//   ],
//   "migrations": [
//     "./src/database/migrations/*.ts"
//   ],
//   "cli":{
//     "migrationsDir": "./src/database/migrations"
//   }
// }
