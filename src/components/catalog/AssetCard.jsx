import styles from './AssetCard.module.css'

export default function AssetCard({ asset, onClick }) {
  const isFlagship = asset.qualityTier === 'Flagship'
  const isRestricted = asset.isRestricted

  return (
    <article
      className={`${styles.card} ${isFlagship ? styles.flagship : ''}`}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onClick?.()}
      aria-label={`View ${asset.title}`}
    >
      {/* Top row — type badge + quality tier badge */}
      <div className={styles.badgeRow}>
        <span className={styles.typeBadge}>{asset.assetType}</span>
        <QualityBadge tier={asset.qualityTier} />
      </div>

      {/* Title */}
      <h3 className={styles.title}>{asset.title}</h3>

      {/* Restricted flag */}
      {isRestricted && (
        <div className={styles.restrictedFlag}>
          ⚠ Account team review required
        </div>
      )}

      {/* Domain + year row */}
      <div className={styles.metaRow}>
        <span className={styles.domain}>
          {asset.capabilityDomain.slice(0, 2).join(', ')}
        </span>
        <span className={styles.year}>{asset.engagementYear}</span>
      </div>

      {/* Summary excerpt */}
      <p className={styles.summary}>{asset.summary}</p>

      {/* Footer — team + downloads */}
      <div className={styles.footer}>
        <span className={styles.team}>{asset.contributingTeam}</span>
        <span className={styles.downloads}>
          <DownloadIcon />
          {asset.downloadCount}
        </span>
      </div>
    </article>
  )
}

function QualityBadge({ tier }) {
  const cls = {
    Flagship:  styles.tierFlagship,
    Standard:  styles.tierStandard,
    Reference: styles.tierReference,
  }[tier] ?? styles.tierStandard

  return <span className={`${styles.tierBadge} ${cls}`}>{tier}</span>
}

function DownloadIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round"
      strokeLinejoin="round" aria-hidden="true">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  )
}
