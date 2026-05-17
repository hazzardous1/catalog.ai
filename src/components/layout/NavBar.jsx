import { Link, useLocation } from 'react-router-dom'
import IntentBar from '../intent/IntentBar'
import styles from './NavBar.module.css'

export default function NavBar() {
  const { pathname } = useLocation()
  const isHome = pathname === '/'

  return (
    <header className={styles.nav}>
      <div className={styles.inner}>

        {/* Wordmark */}
        <Link to="/" className={styles.wordmark} aria-label="LS.AI Catalog home">
          <span className={styles.wordmarkBrand}>LS.AI</span>
          <span className={styles.wordmarkSep} aria-hidden="true"> · </span>
          <span className={styles.wordmarkCatalog}>Catalog</span>
        </Link>

        {/* Center — intent bar (hidden on homepage; hero bar handles it there) */}
        {!isHome && (
          <div className={styles.searchSlot}>
            <IntentBar variant="compact" />
          </div>
        )}

        {/* Right actions */}
        <div className={styles.actions}>
          <Link to="/contribute" className={styles.contributeBtn}>
            Contribute an asset
          </Link>
          <button
            className={styles.bellBtn}
            aria-label="Notifications (coming soon)"
            disabled
          >
            <BellIcon />
          </button>
        </div>

      </div>
    </header>
  )
}

function BellIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"
      strokeLinejoin="round" aria-hidden="true">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  )
}
