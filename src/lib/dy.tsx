import type { Loader as DLoader, DynamicOptions } from 'next/dynamic'

import dynamic from 'next/dynamic'

import { Loader } from '@/components/atoms/loader'

/**
 * Dynamically imports a component with SSR disabled and a default loader.
 * @template T Component type.
 * @param {DLoader<T>} fn Function that returns the dynamic import.
 * @param {DynamicOptions<T>} [options] Optional dynamic import options.
 * @returns A dynamically imported component.
 */
export function dy<T>(fn: DLoader<T>, options?: DynamicOptions<T>) {
  return dynamic(fn, { ssr: false, loading: () => <Loader />, ...options })
}
