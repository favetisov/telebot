import { MessageEntity as TgMessageEntity } from 'telegram-typings';

export interface Card {
  id: number;
  question: { text?: string; caption?: string; photoId?: string; videoId?: string; entities?: TgMessageEntity[] };
  editing: boolean;
  answer: { text?: string; caption?: string; photoId?: string; videoId?: string; entities?: TgMessageEntity[] } | null;
  attempts: Array<{ timestamp: number; mark: number | null }>;
}
