import { configure } from '@client/confg';
import { Context } from '@src/context/context';
import { Middleware } from '@src/interfaces/interfaces';
import { findHandler } from '@src/tools/router.tool';
import { routes } from '@client/routes';
import { handlerNotFoundMw } from '@src/middleware/handler-not-found.middleware';
import { defineLanguageMw } from '@src/middleware/define-language.middleware';
import { LANG } from '@client/interfaces/lang';
import { processCallbackQueryMw } from '@src/middleware/process-query';
import { processMessageQueryMw } from '@src/middleware/process-message';
import { FCardSession } from '@client/interfaces/f-card.session';
import { Resolver } from '@src/services/dependency-injector.service';

export const onTgUpdate = async ({ body: update }, res) => {
  const di = new Resolver();
  configure(di);
  const ctx = di.resolve<Context<FCardSession>>(Context);
  await ctx.setUpdate(update);
  di.overrideDependency(Context, ctx);
  // todo move di definition somewhere so we could override dependencies for testing

  const middlewareChain: Middleware[] = [];
  const handler = findHandler(di, ctx, routes);
  if (!handler) {
    middlewareChain.push(handlerNotFoundMw);
  } else {
    middlewareChain.push(defineLanguageMw(LANG));
    if (ctx.update.callbackData) {
      middlewareChain.push(processCallbackQueryMw(handler));
    } else {
      middlewareChain.push(processMessageQueryMw(handler));
    }
  }

  try {
    for (const mw of middlewareChain) {
      await mw(ctx);
    }
    res.send('ok');
  } catch (e) {
    console.error(e);
    res.status(500).send('Internal server error');
  }
};
