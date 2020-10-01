import { Context } from '@src/context/context';

type Lang = { unknown: string } & Record<string, string>;

/**
 * middleware that sets language to current session if no
 * @param LANG - language enum
 */
export function defineLanguageMw(LANG: Lang) {
  return async (ctx: Context<{ language: Partial<keyof Lang> }>) => {
    if (!ctx.session.data) {
      throw new Error('Cannot define language - you should initialize session first');
    }
    if (!ctx.session.data.language || ctx.session.data.language === LANG.unknown) {
      const updateLanguage =
        ctx.update.message?.from?.language_code ||
        ctx.update.callback_query?.message?.from?.language_code ||
        LANG[LANG.unknown];
      await ctx.session.update({ language: updateLanguage });
    }
  };
}
