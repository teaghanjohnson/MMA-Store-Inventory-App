const pool = require("./pool");

async function getAllCategories() {
  const { rows } = await pool.query("SELECT * FROM categories");
  return rows;
}

async function insertCategory(category) {
  await pool.query("INSERT INTO categories (name) VALUES ($1)", [category]);
}

async function searchCategory(search) {
  const { rows } = await pool.query(
    `
      SELECT *
      FROM categories
      WHERE name LIKE $1
    `,
    [`%${search}%`],
  );
  return rows;
}

async function getCategoryById(id) {
  const { rows } = await pool.query("SELECT * FROM categories WHERE id = $1", [
    id,
  ]);
  return rows;
}
async function updateCategoryById(id, name) {
  await pool.query("UPDATE categories SET name = $1 WHERE id = $2", [name, id]);
}
async function getItemsById(id) {
  const { rows } = await pool.query("SELECT * FROM items WHERE id = $1", [id]);
  return rows;
}
async function getItemsByCategory(category_id) {
  const { rows } = await pool.query(
    `SELECT items.*, categories.name AS category_name
     FROM items
     JOIN categories ON items.category_id = categories.id
     WHERE items.category_id = $1`,
    [category_id],
  );
  return rows;
}
async function updateItems(id, name, stock, category_id) {
  await pool.query(
    "UPDATE items SET name = $1, stock = $2, category_id = $3 WHERE id = $4",
    [name, stock, category_id, id],
  );
}

async function deleteCategory(id) {
  const { rows } = await pool.query(
    `
    DELETE FROM categories
    WHERE id = $1
    `,
    [id],
  );
  return rows;
}

async function deleteAllCategories() {
  const { rows } = await pool.query(`DELETE FROM categories`);
  return rows;
}

async function getAllItems() {
  const { rows } = await pool.query(
    `SELECT items.*, categories.name AS category_name
     FROM items
     JOIN categories ON items.category_id = categories.id`,
  );
  return rows;
}

async function insertItem(name, stock, category_id) {
  await pool.query(
    "INSERT INTO items (name, stock, category_id) VALUES ($1, $2, $3)",
    [name, stock, category_id],
  );
}

async function searchItem(search) {
  const { rows } = await pool.query(
    `
    SELECT *
    FROM items
    WHERE name LIKE $1
    `,
    [`%${search}%`],
  );
  return rows;
}

async function deleteItem(id) {
  const { rows } = await pool.query(
    `
    DELETE FROM items
    WHERE id = $1
    `,
    [id],
  );
  return rows;
}

async function deleteAllItems() {
  const { rows } = await pool.query(`DELETE FROM items`);
  return rows;
}

async function getItemByName(name) {
  const { rows } = await pool.query(
    "SELECT id FROM items WHERE LOWER(name) = LOWER($1)",
    [name],
  );
  return rows;
}

async function getCategoryByName(name) {
  const { rows } = await pool.query(
    "SELECT id FROM categories WHERE LOWER(name) = LOWER($1)",
    [name],
  );
  return rows;
}

async function getTotalCategories() {
  const { rows } = await pool.query("SELECT COUNT(*) FROM categories");
  return rows;
}

async function getTotalItems() {
  const { rows } = await pool.query("SELECT COUNT(*) FROM items");
  return rows;
}
module.exports = {
  getAllCategories,
  insertCategory,
  searchCategory,
  deleteCategory,
  deleteAllCategories,
  getCategoryById,
  updateCategoryById,
  getItemsById,
  getItemsByCategory,
  getAllItems,
  searchItem,
  insertItem,
  deleteItem,
  deleteAllItems,
  updateItems,
  getItemByName,
  getCategoryByName,
  getTotalCategories,
  getTotalItems,
};
