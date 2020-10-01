import { Context } from '@src/context/context';
import { Handler, PARSE_MODE } from '../interfaces/interfaces';
import { Message as TgMessage } from 'telegram-typings';
import { nativeBotCall } from '../tools/bot-client.tool';
import { entitiesToMd, escapeMd } from '../tools/escape-md.tool';

export const processCallbackQueryMw = (handler: () => Promise<void>) => async (ctx: Context<{}>) => {
  const updateMessage = (message: TgMessage, clickReport: string) => {
    return nativeBotCall(ctx.environment.botToken, 'editMessageText', {
      chat_id: message.chat.id,
      message_id: message.message_id,
      text: entitiesToMd(message.text, message.entities) + escapeMd(`\n\n---------------\n`) + clickReport,
      parse_mode: PARSE_MODE.markdownv2,
    });
  };
  await Promise.all([updateMessage(ctx.update.callbackData!.message, ctx.update.callbackData!.clickReport), handler()]);
  await nativeBotCall(ctx.environment.botToken, 'answerCallbackQuery', {
    callback_query_id: ctx.update.callback_query?.id,
  });
};
