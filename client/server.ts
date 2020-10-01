import { nativeBotCall } from '@src/tools/bot-client.tool';
import { allowedTgUpdates } from '@src/interfaces/interfaces';
import { environment } from '@client/environment';
import { onTgUpdate } from '@client/index';

console.log('hey hombre, im alive');

/** recursively looking for updates via long polling */
(async () => {
  const getUpdates = async (lastUpdateId?: number) => {
    console.log('asking for updates');

    const response = await nativeBotCall(environment.botToken, 'getUpdates', {
      allowed_updates: allowedTgUpdates,
      timeout: 120,
      offset: lastUpdateId ? lastUpdateId + 1 : undefined,
    });

    lastUpdateId = response.result?.length ? response.result[response.result.length - 1].update_id : null;
    try {
      for (const update of response.result) {
        // todo process updates from one chat one by one, but from different chats in parallel
        console.time('onmessage');
        await onTgUpdate({ body: update }, { send: () => {} });
        console.timeEnd('onmessage');
      }
    } catch (e) {
      console.error(e);
    }
    return getUpdates(lastUpdateId);
  };
  return getUpdates();
})();
