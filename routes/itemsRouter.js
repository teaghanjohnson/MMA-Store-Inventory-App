const { Router } = require("express");
const itemController = require("../controllers/itemController");
const itemRouter = Router();

itemRouter.get("/", itemController.getItems);
itemRouter.get("/new", itemController.createItemGet);
itemRouter.post("/new", itemController.createItemPost);
itemRouter.get("/search", itemController.searchItemGet);
itemRouter.get("/deleteAll", itemController.deleteAllItemsGet);
itemRouter.get("/:id/delete", itemController.deleteItemGet);
itemRouter.get("/:id/update", itemController.updateItemsGet);
itemRouter.post("/:id/update", itemController.updateItemsPost);

module.exports = itemRouter;
