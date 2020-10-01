import { Context } from '@src/context/context';
import { Resolver } from '@src/services/dependency-injector.service';

export const allowedTgUpdates = [
  'callback_query',
  'channel_post',
  'chosen_inline_result',
  'edited_channel_post',
  'edited_message',
  'inline_query',
  'message',
  'pre_checkout_query',
  'shipping_query',
  'poll',
  'poll_answer',
];

export class Environment {
  botToken: string;
}

export interface Middleware {
  (context: Context<any>): Promise<void>;
}

export type Handler = (di: Resolver) => () => Promise<void>;

export interface BaseRoute {
  handler: Handler;
}

export interface MessageRoute extends BaseRoute {
  onMessage: string | RegExp;
  state?: string;
}

export interface CommandRoute extends BaseRoute {
  onCommand: string;
}

export type Route = MessageRoute | CommandRoute;

export enum PARSE_MODE {
  markdownv2 = 'MarkdownV2',
}
