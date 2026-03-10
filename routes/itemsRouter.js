const { Router } = require("express");
const itemController = require("../controllers/itemController");
const itemRouter = Router();

itemRouter.get("/", itemController.getItems);
itemRouter.get("/new", itemController.createItemGet);
itemRouter.post("/new", itemController.createItemPost);
itemRouter.get("/search", itemController.searchItemGet);
itemRouter.get("/delete", itemController.deleteItemGet);
itemRouter.get("/delete", itemController.deleteAllItemsGet);
itemRouter.get("/update", itemController.updateItems);

module.exports = itemRouter;
