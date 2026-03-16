#! /usr/bin/env node

const { Client } = require("pg");
require("dotenv").config();
const SQL = `
  CREATE TABLE IF NOT EXISTS categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT
  
  );

  INSERT INTO categories (name, description) VALUES ('Gloves', ' Various Striking Gloves');
  INSERT INTO categories (name, description) VALUES ('Pads', 'Various Striking Pads');
  INSERT INTO categories (name, description) VALUES ('Protective Gear', 'Protective Boxing and Muay Thai Gear');
  INSERT INTO categories (name, description) VALUES ('Grappling', 'Gi and No-Gi Essentials');
  INSERT INTO categories (name, description) VALUES ('Training Equipment', 'Bags and Mats');
  INSERT INTO categories (name, description) VALUES ('Footwear', 'Shoes');

  

  CREATE TABLE IF NOT EXISTS items (
    id  SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    price NUMERIC(10, 2),
    stock INTEGER DEFAULT 0,
    category_id INTEGER REFERENCES categories(id) ON DELETE SET NULL

  );

  INSERT INTO items (name, price, stock, category_id) VALUES
  ('MMA Gloves 4 oz', 29.99, 20, 1),
  ('MMA Gloves 8 oz', 34.99, 20, 1),
  ('Boxing Gloves 16 oz', 49.99, 15, 1),
  ('Boxing Gloves 12 oz', 44.99, 15, 1),
  ('Boxing Gloves 8 oz', 39.99, 15, 1),
  ('Sparring Gloves', 59.99, 10, 1),
  ('Thai Pads', 54.99, 12, 2),
  ('Focus Mitts', 39.99, 18, 2),
  ('Kick Shields', 64.99, 8, 2),
  ('Head Gear', 49.99, 10, 3),
  ('Cup', 19.99, 25, 3),
  ('Mouthguard', 14.99, 30, 3),
  ('Elbow/Knee Pads', 24.99, 20, 3),
  ('Shin Guards', 34.99, 15, 3),
  ('Gi', 89.99, 10, 4),
  ('Rash Guards', 44.99, 20, 4),
  ('Grappling Shorts', 39.99, 20, 4),
  ('No-Gi Shorts', 34.99, 20, 4),
  ('Heavy Bag', 149.99, 5, 5),
  ('Speed Bag', 49.99, 10, 5),
  ('Jump Rope', 14.99, 25, 5),
  ('Mats', 129.99, 8, 5),
  ('Wrestling Shoes', 79.99, 12, 6),
  ('Boxing Shoes', 74.99, 12, 6);


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
