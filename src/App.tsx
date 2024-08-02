import { RouterProvider } from 'react-router-dom'
import router from './router'

const App = () => {
  return <RouterProvider router={router} fallbackElement={<p>加载中...</p>} />
}

export default App
