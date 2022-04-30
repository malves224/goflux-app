import { Router } from 'express';
import ShipperController from '../controllers/ShipperController';

const shipperController = new ShipperController('/embarcador');
shipperController.msgNotFound = 'Embarcador não encontrado';
const { route, validationsSchema } = shipperController;
const routeId = `${route}/:id`;
const shipperRouter = Router();

shipperRouter
  .get(routeId, (req, res) => shipperController.findOne(req, res))
  .put(routeId, validationsSchema, (req, res) => shipperController
    .update(req, res))
  .delete(routeId, (req, res) => shipperController.delete(req, res))
  .get(route, (req, res) => shipperController.findAll(req, res))
  .post(route, validationsSchema, (req, res) => shipperController
    .create(req, res));

export default shipperRouter;
