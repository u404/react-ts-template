import { createSingletonPromiseFunction } from '@/utils/helper'
import { get, post } from '@/utils/request'

// withToken默认为true，自动携带token，而如果不需要token，则使用withToken: false
export const login = (params: object) => post('/api/login', params, { withToken: false })

// silent为true时，静默请求，即使请求失败，也不会弹错误提示。而常规请求如果报错，则会弹出错误提示。
export const checkStatus = (params: object) => post('/api/checkStatus', params, { silent: true })

// 获取选项demo数据，该接口会被缓存，不会重复请求
export const getDemoOptions = createSingletonPromiseFunction((params: object) => get('/api/getDemoOptions', params))
