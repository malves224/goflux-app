import App from './app';
import shipperRouter from './routers/ShipperRouters';

const server = new App();

server.addRouter(shipperRouter);

export default server;
