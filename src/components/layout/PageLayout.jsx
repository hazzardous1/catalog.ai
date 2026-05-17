import NavBar from './NavBar'
import styles from './PageLayout.module.css'

export default function PageLayout({ children }) {
  return (
    <div className={styles.root}>
      <NavBar />
      <main className={styles.main}>
        {children}
      </main>
    </div>
  )
}
