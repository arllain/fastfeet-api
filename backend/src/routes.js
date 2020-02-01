import { Router } from 'express';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';

const routes = new Router();

routes.get('/users/login', SessionController.login);
routes.get('/users/:id', UserController.show);
export default routes;
