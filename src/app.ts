import { AppServer } from './server';
import { TYPES } from './types';
import { container } from './inversify/inversify.config';

const server = container.get<AppServer>(TYPES.AppServer);
(async () => {
  await server.setUp();
})();
server.start();
