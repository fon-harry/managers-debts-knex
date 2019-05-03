const environment = process.env.NODE_ENV || "development";
const configuration = require("./knexfile")[environment];
const database = require("knex")(configuration);

const data = require("./data.json");

Promise.all(
  data.managersDebts.map(({ id: id_8, name, clients }) => {
    return database("managers")
      .insert({ id_8, name })
      .then(manager_id => {
        Promise.all(
          clients.map(({ id: id_8, name, contracts }) => {
            return database("clients").insert({ manager_id, id_8, name });
          })
        );
      });
  })
)
  .catch(err => {
    console.error(err);
    throw err;
  })
  .finally(() => {
    database.destroy();
  });
