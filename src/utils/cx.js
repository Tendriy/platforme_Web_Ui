import clsx from 'clsx';

/**
 *
 * @param {...import('clsx').ClassValue} classes
 * @returns {string}
 *
 * @example
 * const className = cx('btn', isActive && 'btn-active');
 */
export function cx(...classes) {
  return clsx(...classes);
}
