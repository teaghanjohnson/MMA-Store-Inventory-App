const express = require("express");
const path = require("path");
const categoriesRouter = require("./routes/categoriesRouter");
const itemsRouter = require("./routes/itemsRouter");
const db = require("./db/queries");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/categories", categoriesRouter);
app.use("/items", itemsRouter);

app.get("/", async (req, res) => {
  const totalCategories = await db.getTotalCategories();
  const totalItems = await db.getTotalItems();
  res.render("index", {
    totalCategories: totalCategories[0].count,
    totalItems: totalItems[0].count,
  });
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
