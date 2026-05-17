import styles from './ConfidenceBadge.module.css'

export default function ConfidenceBadge({ level }) {
  const cls = styles[level.toLowerCase()] ?? styles.low
  return (
    <span className={`${styles.badge} ${cls}`}>
      AI: {level}
    </span>
  )
}
