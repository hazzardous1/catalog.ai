import { useEffect } from 'react'
import styles from './Toast.module.css'

export default function Toast({ message, variant = 'success', duration = 4000, onDismiss }) {
  useEffect(() => {
    const t = setTimeout(onDismiss, duration)
    return () => clearTimeout(t)
  }, [duration, onDismiss])

  return (
    <div
      className={`${styles.toast} ${styles[variant]}`}
      role="alert"
      aria-live="polite"
    >
      <span className={styles.message}>{message}</span>
      <button
        className={styles.dismiss}
        onClick={onDismiss}
        type="button"
        aria-label="Dismiss notification"
      >
        ×
      </button>
    </div>
  )
}
