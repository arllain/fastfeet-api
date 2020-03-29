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
import StartDeliveryController from './app/controllers/StartDeliveryController';
import EndDeliveryController from './app/controllers/EndDeliveryController';
import DeliveryProblemController from './app/controllers/DeliveryProblemController';

const routes = new Router();
const upload = multer(multerConfig);

// No authentication needed routes

// Session routes
routes.post('/sessions', SessionController.login);

// Deliveryman functionalities
routes.get(
  '/deliveryman/:deliveryman_id/deliveries/',
  ViewDeliveryController.index
);
routes.put(
  '/delivery/:deliveryId/:deliverymanId/start/',
  StartDeliveryController.update
);
routes.put(
  '/delivery/:deliveryId/:deliverymanId/end/',
  upload.single('file'),
  EndDeliveryController.update
);
routes.post('/delivery/:id/problems', DeliveryProblemController.store);

// Auth middleware. All routes bellow it will require an authenticated user
routes.use(authMiddleware);

// Authentication needed routes

// User routes
routes.get('/users/:id', UserController.show);

// Recipient routes
routes.get('/recipients', RecipientController.index);
routes.get('/recipients/:id', RecipientController.show);
routes.post('/recipients', RecipientController.store);
routes.put('/recipients/:id', RecipientController.update);
routes.delete('/recipients/:id', RecipientController.delete);

// File upload routes
routes.post('/files', upload.single('file'), FileController.store);

// Products routes
routes.get('/products', ProductController.index);
routes.post('/products', ProductController.store);
routes.put('/products/:id', ProductController.update);
routes.delete('/products/:id', ProductController.delete);

// DeliveryMan  routes
routes.get('/deliveryman', DeliveryManController.index);
routes.post('/deliveryman', DeliveryManController.store);
routes.put('/deliveryman/:id', DeliveryManController.update);
routes.delete('/deliveryman/:id', DeliveryManController.delete);
routes.get('/deliveryman', DeliveryManController.index);
routes.get('/deliveryman/:id', DeliveryManController.show);

// Delivery routes
routes.get('/delivery', DeliveryController.index);
routes.get('/delivery/:id', DeliveryController.show);
routes.post('/delivery', DeliveryController.store);
routes.put('/delivery/:id', DeliveryController.update);
routes.delete('/delivery/:id', DeliveryController.delete);

// Notifications routes
routes.get('/notifications/:deliveryman_id', NotificationController.index);
routes.put('/notifications/:id', NotificationController.update);

// FastFeet routs
routes.get('/delivery/problems', DeliveryProblemController.index);
routes.get('/delivery/:id/problems', DeliveryProblemController.show);
routes.put('/problem/:id/cancel-delivery', DeliveryProblemController.updat);

export default routes;
