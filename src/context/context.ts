import { Message as TgMessage, Update as TgUpdate } from 'telegram-typings';
import { SessionManager } from '@src/session/session-manager';
import { extractButtonData } from '@src/tools/button.tool';
import { Environment } from '@src/interfaces/interfaces';
import { injectable } from '@src/services/dependency-injector.service';

/**
 * Class that accumulates current update (received via webhook or polling) and user session for this update
 */
@injectable
export class Context<SessionData> {
  update: TgUpdate & {
    chatId: number;
    callbackData?: {
      message: TgMessage;
      command: string; // todo think how to type it with CALLBACK_COMMAND
      parameters?: Array<string | number>;
      clickReport: string;
    };
  };

  constructor(public session: SessionManager<SessionData>, public environment: Environment) {}

  /**
   *
   * @param update
   */
  async setUpdate(update: TgUpdate) {
    this.parseUpdate(update);
    await this.initSession();
  }

  private parseUpdate(update: TgUpdate) {
    this.update = Object.assign(update, {
      chatId: update.message?.chat.id || update.callback_query?.message?.chat.id || 0,
    });
    if (update.callback_query?.data && update.callback_query.message) {
      this.update.callbackData = Object.assign(
        { message: update.callback_query.message },
        extractButtonData(this.update.callback_query?.data),
      );
    }
  }

  private async initSession() {
    await this.session.load('chat_' + this.update.chatId);
  }
}
