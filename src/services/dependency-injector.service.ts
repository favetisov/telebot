import 'reflect-metadata';

/**
 * Class decorator that makes class acceptable to resolve via DI
 * @param target
 */
export function injectable<T>(target: Constructor<T>) {
  map.set(target, getParamInfo(target));
}

export class Resolver {
  replacements = new Map<Constructor<any>, Constructor<any> | any>();

  /**
   * Function to override dependency, resolved by DI
   * @param target
   * @param replace
   */
  overrideDependency<T, K extends T>(target: Constructor<T>, replace: K);
  overrideDependency<T, K extends T>(target: Constructor<T>, replace: Constructor<K>);
  overrideDependency<T, K extends T>(target: Constructor<T>, replace: Constructor<K> | K) {
    this.replacements.set(target, replace);
  }

  /**
   * Resolver function
   * @param target
   */
  resolve<T>(target: Constructor<T>): T {
    const replacedTarget: Constructor<T> = this.replacements.get(target) || target;

    // we have already resolved object passed to resolver
    if (typeof replacedTarget === 'object') {
      return replacedTarget;
    }

    if (target.length === 0) {
      return new target();
    }

    const params = map.get(target);
    if (params === undefined) {
      throw new Error(
        `Cannot resolve dependencies for class "${target.name}". Make sure that you use @injectable decorator`,
      );
    }
    const resolved = params.map((p) => this.resolve(p));
    return new target(...resolved);
  }
}

type Constructor<T> = {
  new (...args: any[]): T;
};

const map = new Map<Constructor<any>, any>();

function getParamInfo(target: Constructor<any>) {
  const params: any[] = Reflect.getMetadata('design:paramtypes', target) || [];
  return params;
}
