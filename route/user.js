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
userRouter.get("/users", async (req, res) => {
  const users = await getUsers();
  res.json(users);
});
userRouter.delete("/deleteUser", async (req, res) => {
  const userId = req.body.id;
  const result = await deleteUser(userId);
  res.json(result);
});
userRouter.post("/currencyUpdate", async (req, res) => {
  const userData = req.body;
  const result = await currencyUpdate(userData);
  res.json(result);
});
userRouter.post("/login", async (req, res) => {
  const userData = req.body;
  const result = await login(userData);
  res.json(result);
});

module.exports = userRouter;
