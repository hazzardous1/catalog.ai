import { assets } from '../../data/assets'
import styles from './AgentResponseBlock.module.css'

export default function AgentResponseBlock({ response, onCitationClick }) {
  if (!response) return null

  return (
    <div className={styles.block} role="region" aria-label="Practice Intelligence response">
      <div className={styles.header}>
        <SparkleIcon />
        <span className={styles.label}>Practice Intelligence</span>
      </div>

      <p className={styles.text}>{response.response}</p>

      {response.citations.length > 0 && (
        <div className={styles.citations} aria-label="Source assets">
          {response.citations.map((id) => {
            const asset = assets.find((a) => a.id === id)
            if (!asset) return null
            const isFlagship = asset.qualityTier === 'Flagship'
            return (
              <button
                key={id}
                className={`${styles.chip} ${isFlagship ? styles.chipFlagship : ''}`}
                onClick={() => onCitationClick?.(id)}
                type="button"
                aria-label={`Open ${asset.title}`}
              >
                {asset.title} — {asset.qualityTier} — {asset.engagementYear}
              </button>
            )
          })}
        </div>
      )}

      {response.extrapolation && (
        <p className={styles.warning} role="status">
          No direct prior work found for this query — showing closest matches below.
        </p>
      )}
    </div>
  )
}

function SparkleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"
      aria-hidden="true">
      <path d="M12 2l2.09 6.26L20 10l-5.91 1.74L12 18l-2.09-6.26L4 10l5.91-1.74L12 2z" />
    </svg>
  )
}
