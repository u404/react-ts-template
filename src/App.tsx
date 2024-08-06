import { useEffect } from 'react'
import { RouterProvider } from 'react-router-dom'
import router from './router'
import { login } from './stores/user'

const App = () => {
  useEffect(() => {
    login()
  }, [])

  return <RouterProvider router={router} fallbackElement={<p>加载中...</p>} />
}

export default App
