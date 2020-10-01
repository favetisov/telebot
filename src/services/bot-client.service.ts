import { Context } from '@src/context/context';
import { Message as TelegramMessage } from 'telegram-typings';
import { nativeBotCall } from '@src/tools/bot-client.tool';
import { Environment } from '@src/interfaces/interfaces';
import { injectable } from '@src/services/dependency-injector.service';

@injectable
export class BotClient {
  constructor(private environment: Environment, private ctx: Context<{ lastMessage: TelegramMessage }>) {}

  async send(message): Promise<{ ok: boolean; result: TelegramMessage }> {
    const response = await nativeBotCall(this.environment.botToken, 'sendMessage', message);
    if (!response.result) {
      console.error(response);
      throw new Error('failed to send message');
    }
    await this.ctx.session.update({ lastMessage: response.result });
    return response;
  }

  async edit(message): Promise<{ ok: boolean; result: TelegramMessage }> {
    const response = await nativeBotCall(this.environment.botToken, 'editMessageText', message);
    if (!response.result) {
      console.error(response);
      throw new Error('failed to edit message');
    }
    return response;
  }
}
