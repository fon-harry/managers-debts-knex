const environment = process.env.NODE_ENV || "development";
const configuration = require("./knexfile")[environment];
const database = require("knex")(configuration);

const data = require("./data.json");

Promise.all()
  .catch(err => {
    console.error(err);
    throw err;
  })
  .finally(() => {
    database.destroy();
  });
