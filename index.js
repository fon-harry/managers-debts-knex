const environment = process.env.NODE_ENV || "development";
const configuration = require("./knexfile")[environment];
const database = require("knex")(configuration);

const data = require("./data_real.json");

Promise.all(
  data.managersDebts.map(({ id: id_8, name, clients }) => {
    return database("managers")
      .insert({ id_8, name })
      .then(manager_id => {
        return Promise.all(
          clients.map(({ id: id_8, name, contracts }) => {
            return database("clients")
              .insert({ manager_id, id_8, name })
              .then(client_id => {
                return Promise.all(
                  contracts.map(({ id: id_8, name, debt }) => {
                    return database("contracts").insert({
                      client_id,
                      id_8,
                      name,
                      debt,
                      decimal_debt: debt
                    });
                  })
                );
              });
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
