import { createPromise } from '../../../lib/methods/createPromise';
import { availableCards } from '../mock';

export function get(card_id: keyof typeof availableCards) {
  return createPromise(availableCards[card_id]);
}

export function getResolver(card_id: keyof typeof availableCards) {
  const resolver = availableCards[card_id].resolver;
  return createPromise(resolver ?? (() => {}));
}
