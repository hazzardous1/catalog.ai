import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './IntentBar.module.css'

export default function IntentBar({ variant = 'hero' }) {
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  const submit = () => {
    if (!query.trim()) return
    navigate(`/search?q=${encodeURIComponent(query.trim())}`)
  }

  return (
    <div className={`${styles.bar} ${styles[variant]}`}>
      <SearchIcon className={styles.icon} />
      <input
        type="text"
        className={styles.input}
        placeholder="What are you working on?"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && submit()}
        aria-label="Search the catalog"
        autoComplete="off"
      />
      <button
        className={styles.submit}
        onClick={submit}
        aria-label="Submit search"
        type="button"
      >
        <ArrowIcon />
      </button>
    </div>
  )
}

function SearchIcon({ className }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  )
}

function ArrowIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2.5"
      strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  )
}
