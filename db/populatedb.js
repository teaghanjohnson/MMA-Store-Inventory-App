#! /usr/bin/env node

const { Client } = require("pg");
require("dotenv").config();
const SQL = `
  CREATE TABLE IF NOT EXISTS categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL
  );

  INSERT INTO categories (name) VALUES ('Gloves');
  INSERT INTO categories (name) VALUES ('Pads');
  INSERT INTO categories (name) VALUES ('Protective Gear');
  INSERT INTO categories (name) VALUES ('Grappling');
  INSERT INTO categories (name) VALUES ('Training Equipment');
  INSERT INTO categories (name) VALUES ('Footwear');

  

  CREATE TABLE IF NOT EXISTS items (
    id  SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    stock INTEGER DEFAULT 0,
    category_id INTEGER REFERENCES categories(id) ON DELETE SET NULL

  );

  INSERT INTO items (name, stock, category_id) VALUES
  ('MMA Gloves 4 oz', 20, 1),
  ('MMA Gloves 8 oz', 20, 1),
  ('Boxing Gloves 16 oz', 15, 1),
  ('Boxing Gloves 12 oz', 15, 1),
  ('Boxing Gloves 8 oz', 15, 1),
  ('Sparring Gloves', 10, 1),
  ('Thai Pads', 12, 2),
  ('Focus Mitts', 18, 2),
  ('Kick Shields', 8, 2),
  ('Head Gear', 10, 3),
  ('Cup', 25, 3),
  ('Mouthguard', 30, 3),
  ('Elbow/Knee Pads', 20, 3),
  ('Shin Guards', 15, 3),
  ('Gi', 10, 4),
  ('Rash Guards', 20, 4),
  ('Grappling Shorts', 20, 4),
  ('No-Gi Shorts', 20, 4),
  ('Heavy Bag', 5, 5),
  ('Speed Bag', 10, 5),
  ('Jump Rope', 25, 5),
  ('Mats', 8, 5),
  ('Wrestling Shoes', 12, 6),
  ('Boxing Shoes', 12, 6);


`;

async function main() {
  console.log("seeding...");
  const client = new Client({
    host: process.env.PGHOST,
    user: process.env.PGUSER,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT,
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();
