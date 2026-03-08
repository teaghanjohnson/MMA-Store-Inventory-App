#! /usr/bin/env node

const { Client } = require("pg");

const SQL = `
  CREATE TABLE IF NOT EXISTS categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT
  
  );

  INSERT INTO categories

  CREATE TABLE IF NOT EXISTS items (
    id  SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    price NUMERIC(10, 2),
    stock INTEGER DEFAULT 0,
    category_id INTEGER REFERENCES categories(id) ON DELETE SET NULL

  );
`;

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString:
      "postgresql://<role_name>:<role_password>@localhost:5432/mma_inventory",
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();
