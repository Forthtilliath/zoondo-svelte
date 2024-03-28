import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Concatenates multiple class values into a single string.
 *
 * @param {ClassValue[]} inputs - An array of class values to concatenate.
 * @return {string} - The concatenated class values as a string.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
