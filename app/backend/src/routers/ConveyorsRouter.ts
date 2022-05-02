import { Router } from 'express';
import ConveyorsController from '../controllers/ConveyorsControllers';

const conveyorsController = new ConveyorsController('/transportador');

const { route, validationsSchema } = conveyorsController;
const routeId = `${route}/:id`;
const conveyorsRouter = Router();

conveyorsRouter
  .get(routeId, (req, res) => conveyorsController.findOne(req, res))
  .put(routeId, validationsSchema, (req, res) => conveyorsController
    .update(req, res))
  .delete(routeId, (req, res) => conveyorsController.delete(req, res))
  .get(route, (req, res) => conveyorsController.findAll(req, res))
  .post(route, validationsSchema, (req, res) => conveyorsController
    .create(req, res));

export default conveyorsRouter;
