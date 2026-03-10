const { Router } = require("express");
const categoryController = require("../controllers/categoryController");
const categoryRouter = Router();

categoryRouter.get("/", categoryController.getCategories);
categoryRouter.get("/new", categoryController.createCategoryGet);
categoryRouter.post("/new", categoryController.createCategoryPost);
categoryRouter.get("/search", categoryController.searchCategoryGet);
categoryRouter.get("/delete", categoryController.deleteCategoryGet);
categoryRouter.get("/delete", categoryController.deleteAllCategoriesGet);

module.exports = categoryRouter;
