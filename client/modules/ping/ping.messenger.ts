import { Context } from '@src/context/context';
import { FCardSession } from '@client/interfaces/f-card.session';
import { BotClient } from '@src/services/bot-client.service';
import { LocalizerService } from '@src/services/localizer.service';
import { PingDictionary } from '@client/modules/ping/ping.dictionary';
import { injectable } from '@src/services/dependency-injector.service';

@injectable
export class PingMessenger {
  constructor(
    private ctx: Context<FCardSession>,
    private bot: BotClient,
    private localizer: LocalizerService,
    private dictionary: PingDictionary,
  ) {}

  /**
   * simple ping message
   */
  async ping() {
    await this.bot.send({
      chat_id: this.ctx.update.chatId,
      text: this.localizer.localize(this.dictionary.pong),
    });
  }
}
