import styles from './Home.module.scss'

// 如果想使用 lazy: () => import('@/views/Admin/Home') 的写法引入异步路由组件，必须这么 export
export const Component = () => {
  return <div className={styles.container}>Admin Home</div>
}

Component.displayName = 'Home'

// 同时，export default，使其也可以作为非异步路由组件使用
const Home = Component
export default Home
