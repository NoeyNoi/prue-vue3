import { describe, it, expect } from 'vitest'
import { reactive } from '../src/reactive'
import { effect } from '../src/effect'

describe("reactivity/effect", () => {
  it('should observe basic properties', () => {
    let dummy
    const counter = reactive({ num: 0 })
    effect(() => (dummy = counter.num))
    effect(() => {
      console.log('counter.num', counter.num)
      console.log('dummy', dummy)
    })

    expect(dummy).toBe(0)
    counter.num++
    expect(dummy).toBe(1)
  })
})