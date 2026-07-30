import { clsx, ClassValue } from 'clsx';

/**
 * Utility function to combine class names using clsx
 */
export function cn(...inputs: ClassValue[]): string {
  return clsx(inputs);
}
