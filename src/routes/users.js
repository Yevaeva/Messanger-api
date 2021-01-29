const express = require('express');
const UsersController = require('../controllers/users.controller');
const userRouter = express.Router();
/* GET users listing. */
userRouter.get('/', UsersController.getAll);
userRouter.post('/', UsersController.create);
userRouter.post('/login', UsersController.checkUser);
userRouter.get('/:id', UsersController.getOne);
userRouter.put('/:id', UsersController.update);
userRouter.delete('/:id', UsersController.remove);

module.exports = userRouter;