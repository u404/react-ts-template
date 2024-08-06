import { createStore } from 'zustand'
import { login as apiLogin } from '@/api/common'
import { createThrottlePromiseFunction } from '@/utils/helper'

export type UserState = {
  info: any
  token: string
}

const userStore = createStore<UserState>()((set) => ({
  info: undefined,
  token: ''
}))

export const login = createThrottlePromiseFunction(async () => {
  // dev环境中，针对性处理login
  if (import.meta.env.DEV) {
    const res = await apiLogin({})
    const user: UserState = { info: res, token: res.token }
    userStore.setState(user)
  } else {
    const res = await apiLogin({})
    const user: UserState = { info: res, token: res.token }
    userStore.setState(user)
  }
})

export const forceGetToken = async () => {
  if (!userStore.getState().token) await login()
  return userStore.getState().token
}

export default userStore
