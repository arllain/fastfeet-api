import { Router } from 'express';

const routes = new Router();

routes.get('/', (req, res) =>
  res.json({ message: 'Server is up and running' })
);

export default routes;
