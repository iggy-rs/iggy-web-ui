import { boolean } from 'zod';

export const ensureDefined = <T>(value: T, cb: (value: Exclude<T, undefined>) => void) => {
  console.log('ensureDefined');

  if (value === undefined) {
    throw new Error('EnsureDefined: value is undefined');
  }

  if (value === null) {
    throw new Error('EnsureDefined: value is null');
  }
  return () => cb(value as Exclude<T, undefined>);
};

// function foo<T extends Record<string, any>>(item: T, value: T[keyof T]) {}

// foo({ test: 'asd', val: 'asd' }, "");

// function foo<const T extends Record<string, any>>(item: T, value: `${T[keyof T]}`) {}

// foo({ test: 'test', test1: 'test1', test2: { test22: false }, test3: false }, "");

type ValueString<T extends Record<string, unknown>, K extends keyof T = keyof T> = K extends K
  ? T[K] extends infer S extends string | bigint | number | boolean
    ? `${S}`
    : never
  : never;

function match<const T extends Record<string, any>>(
  item: T,
  discriminator: keyof T,
  matcher: Record<ValueString<T>, (arg: T) => void>
) {
  item[discriminator](item);
}

type ApiFetcherState =
  | {
      success: true;
      data: any;
    }
  | { success: false; error: any };

const apiFetcher = (): ApiFetcherState => {
  if (Math.random() < 0.5) {
    return {
      data: 'Some data',
      success: true
    };
  }

  return {
    error: 'error',
    success: false
  };
};

const apiResult = apiFetcher();

// match(apiResult, 'success', {
//   false: (error) => {
//     console.log('error', error);
//   },
//   true: (data) => {
//     console.log('success', data);
//   }
// });

// const someUnion:
//   | { a: 'test'; b: true }
//   | { a: 'test2'; b: false }
//   | { a: false }
//   | { a: 1; c: 'asd' }
//   | { a: 'hello'; d: 43 } = { a: 1, d: 43 };

// match(someUnion, 'a', {});
