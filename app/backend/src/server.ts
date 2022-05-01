import App from './app';
import offerRouter from './routers/OfferRouters';
import shipperRouter from './routers/ShipperRouters';

const server = new App();

server.addRouter(shipperRouter);
server.addRouter(offerRouter);

export default server;
