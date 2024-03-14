const userRouter = require("express").Router(); // shine router zohioj bgaa
const {
  addUser,
  deleteUser,
  getUsers,
  currencyUpdate,
  login,
} = require("../service/user-service");

userRouter.post("/signup", async (req, res) => {
  const newUserData = req.body;
  const result = await addUser(newUserData);
  res.json(result);
});

module.exports = userRouter;
