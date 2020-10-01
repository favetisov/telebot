export enum LANG {
  unknown = 'unknowm',
  ru = 'ru',
  en = 'en',
  default = 'en',
}

export type LangBlock = { [LANG.default]: string } & { [L in LANG]?: string };
