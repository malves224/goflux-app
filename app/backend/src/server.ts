import App from './app';
import bidRouter from './routers/BidsRouter';
import conveyorsRouter from './routers/ConveyorsRouter';
import offerRouter from './routers/OfferRouters';
import shipperRouter from './routers/ShipperRouters';

const server = new App();

server.addRouter(shipperRouter);
server.addRouter(offerRouter);
server.addRouter(conveyorsRouter);
server.addRouter(bidRouter);

export default server;
