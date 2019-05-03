const environment = process.env.NODE_ENV || "development";
const configuration = require("./knexfile")[environment];
const database = require("knex")(configuration);

const data = require("./data.json");

data.managersDebts.forEach(({ id: id_8, name, clients }) => {
  console.log({ id_8, name });
  clients.forEach(({ id: id_8, name, contracts }) => {
    console.log("==>", { id_8, name });
    contracts.forEach(({ id: id_8, name, debt }) => {
      console.log("====>", { id_8, name, debt });
    });
  });
});
