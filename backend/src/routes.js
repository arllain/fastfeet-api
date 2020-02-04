import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';
import authMiddleware from './app/middleware/auth';
import SessionController from './app/controllers/SessionController';
import RecipientController from './app/controllers/RecipientController';
import FileController from './app/controllers/FileController';
import DelivererController from './app/controllers/DelivererController';

const routes = new Router();
const upload = multer(multerConfig);

// Session routes
routes.get('/sessions', SessionController.login);

// Auth middleware. All routes bellow it will require an authenticated user
routes.use(authMiddleware);

// Recipient routes
routes.post('/recipients', RecipientController.store);
routes.put('/recipients/:id', RecipientController.update);

// File upload routes
routes.post('/files', upload.single('file'), FileController.store);

// Deliverer routes
routes.post('/deliverers', DelivererController.store);

export default routes;
