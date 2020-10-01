import { Route } from '@src/interfaces/interfaces';
import { PingController } from '@client/modules/ping/ping.controller';
import { Resolver } from '@src/services/dependency-injector.service';

export const routes: Route[] = [
  {
    onMessage: '/ping',
    handler: (di: Resolver) => () => di.resolve(PingController).ping(),
  },
];
