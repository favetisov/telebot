import { SessionManager } from '@src/session/session-manager';
import { FilesystemSessionManager } from '@src/session/filesystem.session-manager';
import { FCardSession } from '@client/interfaces/f-card.session';
import { LANG } from '@client/interfaces/lang';
import { STATE } from '@client/interfaces/state';
import { Environment } from '@src/interfaces/interfaces';
import { environment } from '@client/environment';
import { Resolver } from '@src/services/dependency-injector.service';

/**
 * configuring dependencies before app starged
 */
export const configure = (di: Resolver) => {
  di.overrideDependency(
    SessionManager,
    new FilesystemSessionManager<FCardSession>(__dirname + '/../users.json', {
      language: LANG.unknown,
      state: STATE.notInitialized,
      categories: [],
    }),
  );

  di.overrideDependency(Environment, environment);
};
