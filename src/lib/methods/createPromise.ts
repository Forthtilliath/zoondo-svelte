export function createPromise<T>(value: T): Promise<T> {
    return new Promise<T>((resolve) => {
      resolve(value);
    });
  }