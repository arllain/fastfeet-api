import { Router } from 'express';
import UserController from './app/controllers/UserController';

const routes = new Router();

routes.get('/users/:id', UserController.show);
export default routes;
