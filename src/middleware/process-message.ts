import { Context } from '@src/context/context';
import { PARSE_MODE } from '@src/interfaces/interfaces';
import { Message as TgMessage } from 'telegram-typings';
import { nativeBotCall } from '@src/tools/bot-client.tool';
import { entitiesToMd } from '@src/tools/escape-md.tool';

export const processMessageQueryMw = (handler: () => Promise<void>) => async (
  ctx: Context<{ lastMessage: TgMessage }>,
) => {
  const removeButtons = () => {
    if (!ctx.session.data.lastMessage) return;
    return nativeBotCall(ctx.environment.botToken, 'editMessageText', {
      chat_id: ctx.update.chatId,
      message_id: ctx.session.data.lastMessage.message_id,
      text: entitiesToMd(ctx.session.data.lastMessage.text) + ' ',
      parse_mode: PARSE_MODE.markdownv2,
    });
  };
  await Promise.all([removeButtons(), handler()]);
};
