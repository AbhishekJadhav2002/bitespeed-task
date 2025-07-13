import type { DependencyList, EffectCallback } from 'react'

import { useEffect, useRef } from 'react'

/**
 * A custom React Hook that runs an effect only when the dependency array changes,
 * not on the initial render.
 *
 * @param effect The effect function to run.
 * @param dependencies The dependency array to track for changes.
 */
export function useUpdateEffect(effect: EffectCallback, dependencies: DependencyList): void {
  const isInitialMount = useRef(true)
  const effectRef = useRef(effect)

  useEffect(() => {
    effectRef.current = effect
  }, [effect])

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false
      return
    }

    return effectRef.current()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies)
}
