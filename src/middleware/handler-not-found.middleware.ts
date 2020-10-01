import { Context } from '@src/context/context';
import { nativeBotCall } from '@src/tools/bot-client.tool';

export async function handlerNotFoundMw(ctx: Context<any>) {
  await nativeBotCall(ctx.environment.botToken, 'answerCallbackQuery', {
    callback_query_id: ctx.update.callback_query?.id,
    text: 'No handler found for this update',
    show_alert: true,
  });
}
