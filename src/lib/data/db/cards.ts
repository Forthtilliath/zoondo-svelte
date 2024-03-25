import { createPromise } from '$lib/methods/createPromise';
import { availableCards } from '../mock';

export function get(card_id: string) {
  return createPromise(availableCards[card_id]);
}

export function getResolver(card_id: keyof typeof availableCards) {
  let resolver = availableCards[card_id].resolver
  return createPromise(resolver ?? (()=>{}))
}
