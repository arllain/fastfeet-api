import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';
import authMiddleware from './app/middleware/auth';
import SessionController from './app/controllers/SessionController';
import RecipientController from './app/controllers/RecipientController';
import FileController from './app/controllers/FileController';
import DeliveryManController from './app/controllers/DeliveryManController';
import ProductController from './app/controllers/ProductController';
import DeliveryController from './app/controllers/DeliveryController';
import UserController from './app/controllers/UserController';
import NotificationController from './app/controllers/NotificationController';
import ViewDeliveryController from './app/controllers/ViewDeliveryController';
import DeliveryStatusController from './app/controllers/DeliveryStatusController';

const routes = new Router();
const upload = multer(multerConfig);

// No authentication needed routes

// Session routes
routes.get('/sessions', SessionController.login);

// Deliveryman functionalities
routes.get(
  '/deliveryman/:deliveryman_id/deliveries/',
  ViewDeliveryController.index
);
routes.post(
  '/delivery/:deliveryId/:deliverymanId/deliverystatus/',
  DeliveryStatusController.store
);
routes.put(
  '/delivery/:deliveryId/:deliverymanId/deliverystatus/',
  upload.single('file'),
  DeliveryStatusController.update
);

// Auth middleware. All routes bellow it will require an authenticated user
routes.use(authMiddleware);

// Authentication needed routes

// User routes
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
routes.get('/deliveryman', DeliveryManController.index);

// Delivery routes
routes.get('/delivery', DeliveryController.index);
routes.post('/delivery', DeliveryController.store);
routes.put('/delivery/:id', DeliveryController.update);
routes.delete('/delivery/:id', DeliveryController.delete);

// Notifications routes
routes.get('/notifications/:deliveryman_id', NotificationController.index);
routes.put('/notifications/:id', NotificationController.update);

export default routes;
