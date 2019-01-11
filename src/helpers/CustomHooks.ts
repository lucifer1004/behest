import {useState, useEffect, useRef} from 'react'

export const useDebounce = (value: any, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(
    () => {
      const handler = setTimeout(() => {
        setDebouncedValue(value)
      }, delay)

      return () => {
        clearTimeout(handler)
      }
    },
    [value, delay],
  )

  return debouncedValue
}

export const useThrottle = (value: any, limit: number) => {
  const [throttledValue, setThrottledValue] = useState(value)
  const lastRan = useRef(Date.now())

  useEffect(
    () => {
      const handler = setTimeout(() => {
        if (Date.now() - lastRan.current >= limit) {
          setThrottledValue(value)
          lastRan.current = Date.now()
        }
      }, limit - (Date.now() - lastRan.current))

      return () => {
        clearTimeout(handler)
      }
    },
    [value, limit],
  )

  return throttledValue
}
