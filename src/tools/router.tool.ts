import { Route } from '@src/interfaces/interfaces';
import { Context } from '@src/context/context';
import { Resolver } from '@src/services/dependency-injector.service';

export const findHandler = (
  di: Resolver,
  context: Context<{ state: string }>,
  routes: Route[],
): (() => Promise<void>) | undefined => {
  const route = routes.find((r) => {
    if ('onMessage' in r) {
      if (!context.update.message?.text) return;
      if (r.state && context.session.data.state !== r.state) return;
      if (r.onMessage instanceof RegExp) {
        return r.onMessage.test(context.update.message.text);
      } else {
        return context.update.message.text === r.onMessage;
      }
    } else if ('onCommand' in r) {
      if (!context.update.callbackData) return;
      return context.update.callbackData.command === r.onCommand;
    } else {
      return; // other methods not supported yet
    }
  });

  return route?.handler(di);
};
