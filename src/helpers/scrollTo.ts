export const scrollTo = (
  element: HTMLElement,
  targetPosition: number,
  duration: number
) => {
  const start = element.scrollTop
  const change = targetPosition - start
  const startTime = performance.now()
  let now: number, elapsed: number, t: number

  function animateScroll() {
    now = performance.now()
    elapsed = now - startTime
    t = elapsed / duration

    element.scrollTop = start + change * easeInOutQuad(t)

    if (t < 1) {
      requestAnimationFrame(animateScroll)
    }
  }

  function easeInOutQuad(t: number) {
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t
  }

  requestAnimationFrame(animateScroll)
}
