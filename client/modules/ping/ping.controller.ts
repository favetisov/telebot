import { PingMessenger } from '@client/modules/ping/ping.messenger';
import { injectable } from '@src/services/dependency-injector.service';

@injectable
export class PingController {
  constructor(private messenger: PingMessenger) {}

  async ping() {
    await this.messenger.ping();
  }
}
