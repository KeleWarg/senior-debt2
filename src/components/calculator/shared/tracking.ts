/**
 * Analytics hooks — wire to your provider (Segment, GA, etc.)
 */
export function trackEvent(
  name: string,
  properties?: Record<string, string | number | boolean | undefined>
): void {
  if (process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line no-console
    console.debug('[track]', name, properties)
  }
}
