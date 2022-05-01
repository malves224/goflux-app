import { Router } from 'express';
import OfferController from '../controllers/OfferController';

const offerController = new OfferController('/oferta');

const { route, validationsSchema } = offerController;
const routeId = `${route}/:id`;
const offerRouter = Router();

offerRouter
  .get(routeId, (req, res) => offerController.findOne(req, res))
  .put(routeId, validationsSchema, (req, res) => offerController
    .update(req, res))
  .delete(routeId, (req, res) => offerController.delete(req, res))
  .get(route, (req, res) => offerController.findAll(req, res))
  .post(route, validationsSchema, (req, res) => offerController
    .create(req, res));

export default offerRouter;
