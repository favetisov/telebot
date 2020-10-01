import { LANG } from '@client/interfaces/lang';
import { injectable } from '@src/services/dependency-injector.service';

@injectable
export class PingDictionary {
  pong = {
    [LANG.en]: 'pong',
    [LANG.ru]: 'понг',
  };
}
