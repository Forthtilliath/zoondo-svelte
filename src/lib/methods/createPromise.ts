export function createPromise<T>(value: T): Promise<T> {
  return Promise.resolve<T>(value);
}
