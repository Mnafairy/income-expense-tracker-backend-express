const categoryRouter = require("express").Router();
const { addCategory } = require("../service/category-service");

categoryRouter.post("/addCategory", async (req, res) => {
  const categoryData = req.body;
  const result = await addCategory(categoryData);
  res.json(result);
});

module.exports = categoryRouter;
