import { describe, it, expect, beforeEach } from 'vitest'
import { setupCounter } from './counter'

let button: HTMLButtonElement

beforeEach(() => {
  // fresh DOM per test
  document.body.innerHTML = `<button id="counter" type="button"></button>`
  button = document.querySelector<HTMLButtonElement>('#counter')!
  setupCounter(button)
})

describe('setupCounter', () => {
  it('initializes with Count is 0', () => {
    expect(button.textContent).toBe('Count is 0')
  })

  it('increments on click', async () => {
    button.click()
    expect(button.textContent).toBe('Count is 1')

    button.click()
    expect(button.textContent).toBe('Count is 2')
  })
})
