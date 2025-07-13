'use client'

import type { Parser } from 'nuqs'

import { useRouter } from 'next/navigation'
import { parseAsInteger, parseAsString, useQueryState } from 'nuqs'
import { useCallback, useEffect, useRef, useState } from 'react'

/**
 * Hook for managing URL query parameters using nuqs
 * @template T The type of the parameter value (string or number).
 * @param {string} paramName - The name of the query parameter to manage.
 * @param {T} defaultValue - The default value to use if the parameter is not present.
 * @param {boolean} [persist=true] - If false, updating the param removes other existing query params.
 * @returns {[T, (newValue: T) => void, () => void]} A tuple containing the current value, a function to update it, and a function to remove it.
 */
export function useQueryParam<T extends number | string>(
  paramName: string,
  defaultValue: T,
  persist: boolean = true
): [T, (newValue: T) => void, () => void] {
  const router = useRouter()

  const parser = (
    typeof defaultValue === 'number'
      ? parseAsInteger.withDefault(defaultValue)
      : parseAsString.withDefault(defaultValue as string)
  ) as Parser<T>

  // Use nuqs for URL writing and external change detection
  const [nuqsValue, setNuqsValue] = useQueryState<T>(paramName, parser)

  // Local state for immediate UI feedback
  const [localValue, setLocalValue] = useState<T>(defaultValue)

  // Ref to track the latest localValue without causing the sync effect to run unnecessarily
  const localValueRef = useRef(localValue)
  useEffect(() => {
    localValueRef.current = localValue
  }, [localValue])

  // Sync local state ONLY when nuqsValue changes (indicating external URL change or initial load)
  useEffect(() => {
    const valueFromUrl = nuqsValue ?? defaultValue
    // Only update local state if the value derived from URL differs from the *current* local state ref
    // This prevents overwriting immediate local updates before nuqs has caught up
    if (valueFromUrl !== localValueRef.current) {
      setLocalValue(valueFromUrl)
    }
    // Effect depends ONLY on nuqsValue (and defaultValue stability)
  }, [nuqsValue, defaultValue])

  const updateValue = useCallback(
    (newValue: T) => {
      setLocalValue(newValue)

      if (persist) {
        setNuqsValue(newValue)
      } else {
        const cleanUrl = new URL(globalThis.location.href)
        cleanUrl.search = ''
        cleanUrl.searchParams.set(paramName, String(newValue))
        router.push(cleanUrl.toString(), { scroll: false })
      }
    },
    [paramName, persist, router, setNuqsValue]
  )

  // Reset local state instantly, then remove param from URL
  const remove = useCallback(() => {
    setLocalValue(defaultValue)

    if (persist) {
      setNuqsValue(null)
    } else {
      const cleanUrl = new URL(globalThis.location.href)
      cleanUrl.search = ''
      router.push(cleanUrl.toString(), { scroll: false })
    }
  }, [defaultValue, persist, router, setNuqsValue])

  return [localValue, updateValue, remove]
}
