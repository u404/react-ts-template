import { lazy, Suspense } from 'react'
import { RouteObject } from 'react-router-dom'
import Home from '@/views/Home'
import _404 from '@/views/_404'

const render = (load: () => Promise<{ default: () => JSX.Element }>) => {
  const Comp = lazy(load)
  return (
    <Suspense>
      <Comp />
    </Suspense>
  )
}

const loader = (load: () => Promise<{ default: () => JSX.Element }>) => async () => ({ Component: (await load()).default })

export default [
  {
    index: true,
    element: <Home />
  },
  // 异步路由 加载方式1 - 使用定制的 render 函数
  {
    path: '/about',
    element: render(() => import('@/views/About'))
  },
  // 嵌套路由
  {
    path: '/admin',
    // 异步路由 加载方式2 - 使用定制的loader 和 lazy
    lazy: loader(() => import('@/views/Admin/Layout')),
    // async () => ({ Component: (await import('@/views/Admin/Layout')).default }),
    children: [
      {
        index: true,
        lazy: () => import('@/views/Admin/Home') // 异步路由 加载方式3 - 直接使用 lazy，但对组件定义有特殊要求
      }
    ]
  },
  {
    path: '*',
    element: <_404 />
  }
] as RouteObject[]
