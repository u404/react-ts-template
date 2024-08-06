import axios, { AxiosRequestConfig } from 'axios'
import { SERVICE_URL } from './config'
import { login, forceGetToken } from '@/stores/user'

export type RequestConfig = AxiosRequestConfig & { withToken?: boolean; silent?: boolean }

const instance = axios.create({
  baseURL: SERVICE_URL,
  timeout: 30000,
  withCredentials: true
})

instance.interceptors.request.use(
  async (conf) => {
    const { withToken = true, silent = false, ...config } = conf as RequestConfig
    if (withToken) {
      if (!config.headers) {
        config.headers = {}
      }
      config.headers.Authorization = await forceGetToken()
    }
    return { silent, ...config } as any
  },
  (error) => {
    return Promise.reject(error)
  }
)

instance.interceptors.response.use(
  (response) => {
    if (+response.data.code === 0) {
      return response.data.data
    }
    throw new Error(response.data.message)
  },
  async (error) => {
    const config = error.config
    const response = error.response
    if (response.status === 401) {
      // 任意一个请求，出现401时，会自动调用一下登录接口，重新请求一次。
      if (!config.isRetry) {
        await login()
        return instance({ ...config, isRetry: true })
      }
      // 对于已经重试过的请求，则会报错
      alert('登录信息超时，请重新进入系统')
      throw new Error('登录信息超时，请稍后再试')
    }

    if (!config.silent) {
      // 是否静默请求，对于非静默请求，会自动弹出错误消息
      alert(error.message || '服务器响应失败，请稍后再试')
    }
    return Promise.reject(error)
  }
)

// 请求中的登录态设置
export const setToken = (token: string) => {
  instance.defaults.headers.common.Authorization = token
}

export const get = <T = any>(url: string, params?: Record<string, any>, config?: RequestConfig) => {
  return instance.get<unknown, T>(url, { ...config, params: { ...params, ...config?.params } })
}

export const post = <T = any>(url: string, data?: any, config?: RequestConfig) => {
  return instance.post<unknown, T>(url, data, config)
}

export const patch = <T = any>(url: string, data?: any, config?: RequestConfig) => {
  return instance.patch<unknown, T>(url, data, config)
}

export const postForm = <T = any>(url: string, data?: FormData, config?: RequestConfig) => {
  return instance.postForm<unknown, T>(url, data, config)
}

export const del = <T = any>(url: string, config?: RequestConfig) => {
  return instance.delete<unknown, T>(url, config)
}

export const put = <T = any>(url: string, data?: any, config?: RequestConfig) => {
  return instance.put<unknown, T>(url, data, config)
}

export const request = <T = any>(url: string, config?: RequestConfig) => {
  return instance<unknown, T>(url, config)
}

export default instance
