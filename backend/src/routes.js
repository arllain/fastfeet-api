import { Router } from 'express';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import authMiddleware from './app/middleware/auth';

const routes = new Router();

routes.get('/users/login', SessionController.login);
routes.get('/users/:id', UserController.show);

routes.use(authMiddleware);

export default routes;
