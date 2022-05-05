import { Router } from 'express';
import BidController from '../controllers/BidController';

const bidController = new BidController('/lance');

const { route, validationsSchema } = bidController;
const routeId = `${route}/:id`;
const bidRouter = Router();

bidRouter
  .get(routeId, (req, res) => bidController.findAllByIdOwner(req, res))
  .get(route, (req, res) => bidController.findAllActive(req, res))
  .put(routeId, validationsSchema, (req, res) => bidController
    .update(req, res))
  .delete(routeId, (req, res) => bidController.delete(req, res))
  .post(route, validationsSchema, (req, res) => bidController
    .create(req, res));

export default bidRouter;
