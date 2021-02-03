
const express = require('express'),
validator = require('../middlewares/validator.middleware'),
auth = require('../middlewares/auth.middleware'),
chatRoomController = require('../controllers/chatroom.controller'),
chatRoomRouter = express.Router();

/**
* Аll routes start with '/chatRoom'
**/
// userRouter.get('/', userController.getAll);

chatRoomRouter.post('/',auth, /*validator('user-create'),*/ chatRoomController.createChatRoom);
chatRoomRouter.get('/',auth, /*validator('user-create'),*/ chatRoomController.getAllChatrooms);





module.exports = chatRoomRouter;













// const express = require('express');
// const UsersController = require('../controllers/users.controller');
// const userRouter = express.Router();
// /* GET users listing. */
// userRouter.get('/', UsersController.getAll);
// userRouter.post('/', UsersController.create);
// userRouter.post('/login', UsersController.signIn);
// userRouter.get('/:id', UsersController.getOne);
// userRouter.put('/:id', UsersController.update);
// userRouter.delete('/:id', UsersController.remove);

// module.exports = userRouter;