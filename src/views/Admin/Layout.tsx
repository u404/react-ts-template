import styles from './Layout.module.scss'

import { Outlet } from 'react-router-dom'

const AdminLayout = () => {
  return (
    <div className={styles.container}>
      <div>admin</div>
      <hr />
      <Outlet />
    </div>
  )
}

export default AdminLayout
