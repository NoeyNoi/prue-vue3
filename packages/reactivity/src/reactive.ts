import { track, trigger } from "./effect"

export function reactive<T extends object>(target: T)
export function reactive(target: object): object {
  return createReactiveObject(target)
}


function createReactiveObject(target: object) {
  const proxy = new Proxy(target, {
    get (target, key, receiver) {
      const res = Reflect.get(target, key, receiver)
      // TODO 依赖收集
      track(target, key)
      return res
    },
    set (target, key, value, receiver) {
      const res = Reflect.set(target, key, value, receiver)
      // TODO 触发依赖
      trigger(target, key)
      return res
    }
  })
  return proxy
}