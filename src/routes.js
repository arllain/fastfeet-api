import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';
import authMiddleware from './app/middleware/auth';
import SessionController from './app/controllers/SessionController';
import RecipientController from './app/controllers/RecipientController';
import FileController from './app/controllers/FileController';
import DeliveryManController from './app/controllers/DeliveryManController';
import ProductController from './app/controllers/ProductController';
import DeliveriesController from './app/controllers/DeliveriesController';
import UserController from './app/controllers/UserController';

const routes = new Router();
const upload = multer(multerConfig);

// Session routes
routes.get('/sessions', SessionController.login);

// Auth middleware. All routes bellow it will require an authenticated user
routes.use(authMiddleware);

// Deliverer routes
routes.get('/users/:id', UserController.show);

// Recipient routes
routes.post('/recipients', RecipientController.store);
routes.put('/recipients/:id', RecipientController.update);

// File upload routes
routes.post('/files', upload.single('file'), FileController.store);

// Products routes
routes.get('/products', ProductController.index);
routes.post('/products', ProductController.store);
routes.put('/products/:id', ProductController.update);
routes.delete('/products/:id', ProductController.delete);

// DeliveryMan routes
routes.get('/deliveryman', DeliveryManController.index);
routes.post('/deliveryman', DeliveryManController.store);
routes.put('/deliveryman/:id', DeliveryManController.update);
routes.delete('/deliveryman/:id', DeliveryManController.delete);

// Deliveries routes
routes.get('/deliveries', DeliveriesController.index);
routes.post('/deliveries', DeliveriesController.store);

/* 
routes.put('/deliveries/:id', DeliveriesController.update);
routes.delete('/deliveries/:id', DeliveriesController.delete); */

export default routes;
