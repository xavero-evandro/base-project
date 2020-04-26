import { Router } from 'express';
import SessionController from '../controllers/session';

const sessionsRouter = Router();

sessionsRouter.post('/', SessionController.create);

export default sessionsRouter;
