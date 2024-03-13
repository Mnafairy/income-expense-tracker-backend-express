const userRouter = require("express").Router(); // shine router zohioj bgaa

userRouter.get(signup, async (req, res) => {
  const users = await getUsers();
  req.json(users);
});

module.exports = userRouter;
