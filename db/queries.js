const pool = require("./pool");

async function getAllCategories() {
  const { rows } = await pool.query("SELECT * FROM categories");
  return rows;
}

async function insertCategory(category) {
  await pool.query("INSERT INTO categories (category) VALUES ($1)", [category]);
}

async function searchCategories(search) {
  const { rows } = await pool.query(
    `
      SELECT *
      FROM categories
      WHERE category LIKE $1
    `,
    [`%${search}%`],
  );
  return rows;
}

async function deleteCategory(category) {
  const { rows } = await pool.query(
    `
    DELETE FROM category
    WHERE category LIKE $1
    `,
    [category],
  );
  return rows;
}

async function deleteAllCategories() {
  const { rows } = await pool.query(`DELETE FROM category`);
  return rows;
}

async function searchItem(search) {
  const { rows } = await pool.query(
    `
    SELECT *
    FROM items
    WHERE items LIKE $1
    `,
    [`%${search}%`],
  );
  return rows;
}
