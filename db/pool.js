const { Pool } = require("pg");
require("dotenv").config();

module.exports = new Pool({
  host: "localhost", // or wherever the db is hosted
  user: "teaghanjohnson",
  database: "mma_inventory",
  password: "Greatness",
  port: 5432,
});
