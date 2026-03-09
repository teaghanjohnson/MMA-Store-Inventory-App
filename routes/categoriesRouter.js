const { Router } = require("express");
const categoryController = require("../controllers/categoryController");
const categoryRouter = Router();

categoryRouter.get("/", categoryController.getCategories);
categoryRouter.get("/new", categoryController.createCategoryGet);
categoryRouter.get("/new", categoryController.createCategoryPost);
categoryRouter.get("/search", categoryController.searchCategoryGet);
categoryRouter.get("/search", categoryController.searchItem);
