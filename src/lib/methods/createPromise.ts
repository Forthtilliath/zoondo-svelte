/**
 * Creates a promise that resolves with the provided value.
 *
 * @param {T} value - The value to be resolved by the promise.
 * @return {Promise<T>} A promise that resolves with the provided value.
 */
export function createPromise<T>(value: T): Promise<T> {
  return Promise.resolve<T>(value);
}
