import { Router } from 'express';
import { adminMW } from './middleware';
import { login, logout } from './Auth';
const queries = require('../daos/Postgresql/queries');


// Auth router
const authRouter = Router();
authRouter.post('/login', login);
authRouter.get('/logout', logout);


// User router
const userRouter = Router();
userRouter.get('/', queries.getUsers);
userRouter.get('/:id', queries.getUserById);
userRouter.post('/', queries.createUser);
userRouter.put('/:id', queries.updateUser);

// Score router
const scoreRouter = Router();
scoreRouter.post('/', queries.createScore);

// Export the base router
const baseRouter = Router();
baseRouter.use('/auth', authRouter);
baseRouter.use('/users', adminMW, userRouter);
baseRouter.use('/scores', scoreRouter);
export default baseRouter;
