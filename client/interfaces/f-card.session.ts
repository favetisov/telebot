import { Category } from './category';
import { Message as TgMessage } from 'telegram-typings';
import { LANG } from '@client/interfaces/lang';
import { STATE } from '@client/interfaces/state';

export interface FCardSession {
  language: LANG;
  state: STATE;
  categories: Category[];
  lastMessage?: TgMessage;
  currentCardId?: number;
}
