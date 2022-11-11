let activeEffect: any

export class ReactiveEffect {
  private _fn: any

  constructor(fn) {
    this._fn = fn
  }

  run () {
    activeEffect = this
    return this._fn()
  }
}


export function effect(fn: Function) {
  const _effect = new ReactiveEffect(fn)
  _effect.run()

  return _effect.run.bind(_effect)
}
/**
 * targetMap: 
 * 用来保存所有的target
 * key: target
 * value: depsMap
 */
const targetMap = new WeakMap()
// 收集依赖
export function track(target: object, key: unknown) {
  /**
   * target -> depsMap => key -> dep
   * depsMap: 
   * target 对应的依赖
   * key: key
   * value: dep
   */
  let depsMap = targetMap.get(target)

  if(!depsMap) {
    depsMap = new Map()
    targetMap.set(target, depsMap)
  }

  let dep = depsMap.get(key)
  if(!dep) {
    dep = new Set()
    depsMap.set(key, dep)
  }

  dep.add(activeEffect)

}
// 触发依赖
export function trigger(target: object, key: unknown) {
  let depsMap = targetMap.get(target)
  let dep = depsMap.get(key)
  for(const effect of dep) {
    effect.run()
  }
}