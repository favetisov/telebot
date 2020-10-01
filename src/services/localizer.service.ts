import { Context } from '@src/context/context';
import { injectable } from '@src/services/dependency-injector.service';

// TODO figure out how to type LANG and LangBlock !!!
type LANG = { default: string } & Record<string, string>;
type LangBlock = Record<string, string>;

@injectable
export class LocalizerService {
  constructor(private ctx: Context<{ language: any }>) {}

  localize(langBlock: LangBlock, params?: Record<string, string>) {
    const locals = langBlock[this.ctx.session.data.language] || langBlock['default'];
    const res = params ? this.interpolate(locals, params) : locals;
    return res;
  }

  private interpolate = (template: string, params: Record<string, string>): string => {
    for (const key in params) {
      template = template.replace('${' + key + '}', params[key]);
    }
    return template;
  };
}
