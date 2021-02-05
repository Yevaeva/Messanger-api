
const express = require('express'),
validator = require('../middlewares/validator.middleware'),
auth = require('../middlewares/auth.middleware'),
userController = require('../controllers/user.controller'),
userRouter = express.Router();

/**
* Аll routes start with '/user'
**/
 userRouter.get('/:email', userController.getOne);


// Create a new user
userRouter.post('/', /*validator('user-create'),*/ userController.create);



// Sign in
userRouter.post('/sign-in', /*validator('user-sign-in'),*/ userController.signIn);

//  Sign out
userRouter.post('/sign-out', auth,/* validator('user-sign-out'),*/ userController.signOut);




//fixme

// update token
// userRouter.put('/:id/update-token', userController.token_update);

module.exports = userRouter;













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