import { availableCards } from '../mock';

function createPromise<T>(value: T): Promise<T> {
  return new Promise<T>((resolve) => {
    resolve(value);
  });
}

export function get(card_id: string) {
  return createPromise(availableCards[card_id]);
}
