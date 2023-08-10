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
