const tableRouter = require("express").Router(); // shine router zohioj bgaa
const {
  createUsersTable,
  addColumn,
  deleteTable,
  createTransTable,
  createCategoryTable,
} = require("../service/table-service");

tableRouter.post("/createUsersTable", async (req, res) => {
  const result = await createUsersTable();
  res.json(result);
});
tableRouter.post("/addColumn", async (req, res) => {
  const result = await addColumn();
  res.json(result);
});
tableRouter.delete("/deleteTable", async (req, res) => {
  const result = await deleteTable();
  res.json(result);
});
tableRouter.post("/createTransTable", async (req, res) => {
  const result = await createTransTable();
  res.json(result);
});
tableRouter.post("/createCategoryTable", async (req, res) => {
  const result = await createCategoryTable();
  res.json(result);
});

module.exports = tableRouter;
