import App from './app';
import conveyorsRouter from './routers/ConveyorsRouter';
import offerRouter from './routers/OfferRouters';
import shipperRouter from './routers/ShipperRouters';

const server = new App();

server.addRouter(shipperRouter);
server.addRouter(offerRouter);
server.addRouter(conveyorsRouter);

export default server;
