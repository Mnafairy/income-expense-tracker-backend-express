const transRouter = require("express").Router();
const { addRecord } = require("../service/record-service");

transRouter.post("/addRecord", async (req, res) => {
  const recordData = req.body;
  const result = await addRecord(recordData);
  res.json(result);
});

module.exports = transRouter;
