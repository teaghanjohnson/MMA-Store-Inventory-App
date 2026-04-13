const db = require("../db/queries");

async function getCategories(req, res) {
  const categories = await db.getAllCategories();
  res.render("category", { categories });
}

async function getCategoryById(req, res) {
  const { id } = req.params;
  const category = await db.getCategoryById(id);
  res.render("category", { categories: category });
}

async function createCategoryGet(req, res, error) {
  res.render("createCategory", { error: null });
}

async function createCategoryPost(req, res, error) {
  const { name } = req.body;
  if (!name) {
    return res.render("createCategory", { error: "Name is required." });
  }
  const existing = await db.getCategoryByName(name);
  if (existing.length > 0) {
    return res.render("createCategory", { error: "A category with that name already exists." });
  }
  await db.insertCategory(name);
  res.redirect("/categories");
}
async function searchCategoryGet(req, res) {
  const { search } = req.query;
  const categories = search
    ? await db.searchCategory(search)
    : await db.getAllCategories();
  res.render("searchCategory", { categories });
}
async function deleteCategoryPageGet(req, res) {
  const categories = await db.getAllCategories();
  res.render("deleteCategory", { categories });
}

async function deleteCategoryGet(req, res) {
  const { id } = req.params;
  await db.deleteCategory(id);
  res.redirect("/categories");
}

async function deleteAllCategoriesGet(req, res) {
  await db.deleteAllCategories();
  res.redirect("/");
}

async function updateCategoryGet(req, res) {
  const { id } = req.params;
  const category = await db.getCategoryById(id);
  res.render("updateCategory", { category: category[0] });
}

async function updateCategoryPost(req, res, error) {
  const { id } = req.params;
  const { name } = req.body;
  if (!name) {
    const category = await db.getCategoryById(id);
    return res.render("updateCategory", { error: "Name is required", category: category[0] });
  }
  const existing = await db.getCategoryByName(name);
  if (existing.length > 0 && existing[0].id !== parseInt(id)) {
    const category = await db.getCategoryById(id);
    return res.render("updateCategory", { error: "A category with that name already exists.", category: category[0] });
  }
  await db.updateCategoryById(id, name);
  res.redirect("/categories");
}

module.exports = {
  getCategories,
  getCategoryById,
  createCategoryGet,
  createCategoryPost,
  searchCategoryGet,
  deleteCategoryGet,
  deleteAllCategoriesGet,
  updateCategoryGet,
  updateCategoryPost,
  deleteCategoryPageGet,
};
