const { Router } = require("express");
const categoryController = require("../controllers/categoryController");
const categoryRouter = Router();

categoryRouter.get("/", categoryController.getCategories);
categoryRouter.get("/new", categoryController.createCategoryGet);
categoryRouter.post("/new", categoryController.createCategoryPost);
categoryRouter.get("/search", categoryController.searchCategoryGet);
categoryRouter.get("/deleteAll", categoryController.deleteAllCategoriesGet);
categoryRouter.get("/delete", categoryController.deleteCategoryPageGet);
categoryRouter.get("/:id", categoryController.getCategoryById);
categoryRouter.get("/:id/delete", categoryController.deleteCategoryGet);
categoryRouter.get("/:id/update", categoryController.updateCategoryGet);
categoryRouter.post("/:id/update", categoryController.updateCategoryPost);

module.exports = categoryRouter;
