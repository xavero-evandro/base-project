import { Router } from 'express';
import UserController from '../controllers/user';
// import authGuard from '../middlewares/auth-guard';

const usersRouter = Router();

// usersRouter.get('/', authGuard, UserController.index);
usersRouter.get('/', UserController.index);
usersRouter.post('/', UserController.create);

export default usersRouter;
