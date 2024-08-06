/**
 * 代替 sessionStorage 功能，来直接取值/赋值对象、数组、数字等类型值
 * @example
 * sessionCache.a = {} // 存储
 * const a = sessionCache.a // 取值
 * sessionCache.a.b = 1; // 注意，这是错误的！无法深度赋值
 * sessionCache.a = { ...sessionCache.a, b: 1 } // 如有必要，可以这样赋值
 */
export const sessionCache = (() => {
  const cache = {}
  const handler: ProxyHandler<Record<string, any>> = {
    get(target, key: string) {
      return sessionStorage[key] && JSON.parse(sessionStorage[key])
    },
    set(target, key: string, value) {
      if (value === undefined) {
        sessionStorage.removeItem(key)
      } else {
        sessionStorage[key] = JSON.stringify(value)
      }
      return true
    }
  }

  return new Proxy(cache, handler)
})()

/**
 * 代替 localStorage 功能，来直接取值/赋值对象、数组、数字等类型值
 * @example
 * localCache.a = {} // 存储
 * const a = localCache.a // 取值
 * localCache.a.b = 1; // 注意，这是错误的！无法深度赋值
 * localCache.a = { ...localCache.a, b: 1 } // 如有必要，可以这样赋值
 */
export const localCache = (() => {
  const cache = {}
  const handler: ProxyHandler<Record<string, any>> = {
    get(target, key: string) {
      return localStorage[key] && JSON.parse(localStorage[key])
    },
    set(target, key: string, value) {
      if (value === undefined) {
        localStorage.removeItem(key)
      } else {
        localStorage[key] = JSON.stringify(value)
      }
      return true
    }
  }

  return new Proxy(cache, handler)
})()

export type PromiseFunction<T = any> = (...args: any[]) => Promise<T>

/**
 * 创建 promise 函数的单例函数。多次执行只会返回同一个promise；若rejected，则会重新执行原函数获取promise
 * @param {function} promiseFunction - 返回值为 promise 的函数
 * @returns 一个新的代理函数
 */
export const createSingletonPromiseFunction = <T extends PromiseFunction>(promiseFunction: T) => {
  let promise: Promise<Awaited<ReturnType<T>>> | undefined
  return (...args: Parameters<T>) => {
    if (!promise) {
      promise = promiseFunction(...args).catch((e) => {
        promise = undefined
        throw e
      })
    }
    return promise
  }
}

/**
 * 创建 promise 函数的节流函数。在promise pending状态下，多次执行，只会返回同一个promise。
 * @param {function} promiseFunction - 返回值为 promise 的函数
 * @returns 一个新的代理函数
 */
export const createThrottlePromiseFunction = <T extends PromiseFunction>(promiseFunction: T) => {
  let promise: Promise<Awaited<ReturnType<T>>> | undefined
  return (...args: Parameters<T>) => {
    if (!promise) {
      promise = promiseFunction(...args)
    }
    return promise.finally(() => {
      promise = undefined
    })
  }
}
