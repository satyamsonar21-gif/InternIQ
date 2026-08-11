import { logger } from './logger'

export async function asyncHandler<T>(
  asyncFn: () => Promise<T>,
  options?: {
    onError?: (err: Error) => void
    fallbackValue?: T
    contextMessage?: string
  }
): Promise<{ data: T | null; error: Error | null }> {
  try {
    const data = await asyncFn()
    return { data, error: null }
  } catch (err: unknown) {
    const error = err instanceof Error ? err : new Error(String(err))
    logger.error(options?.contextMessage || 'Async operation failed', { errorMessage: error.message })

    if (options?.onError) {
      options.onError(error)
    }

    return {
      data: options?.fallbackValue !== undefined ? options.fallbackValue : null,
      error,
    }
  }
}

export function createDebouncedSubmit<T extends (...args: any[]) => any>(fn: T, delayMs: number = 500): T {
  let timeoutId: ReturnType<typeof setTimeout> | null = null

  return ((...args: Parameters<T>) => {
    if (timeoutId) clearTimeout(timeoutId)
    timeoutId = setTimeout(() => {
      fn(...args)
    }, delayMs)
  }) as T
}
