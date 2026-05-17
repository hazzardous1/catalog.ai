import { useState, useMemo } from 'react'
import AssetCard from './AssetCard'
import styles from './AssetGrid.module.css'

const SORT_OPTIONS = [
  { key: 'relevance', label: 'Relevance' },
  { key: 'recency',   label: 'Recency'   },
  { key: 'quality',   label: 'Quality Tier' },
]

const TIER_ORDER = { Flagship: 0, Standard: 1, Reference: 2 }

function sortAssets(assets, sortBy) {
  if (sortBy === 'recency') return [...assets].sort((a, b) => b.engagementYear - a.engagementYear)
  if (sortBy === 'quality') return [...assets].sort((a, b) => TIER_ORDER[a.qualityTier] - TIER_ORDER[b.qualityTier])
  return assets // relevance: preserve incoming order
}

export default function AssetGrid({ assets, onCardClick }) {
  const [sortBy, setSortBy] = useState('relevance')
  const sorted = useMemo(() => sortAssets(assets, sortBy), [assets, sortBy])

  if (sorted.length === 0) {
    return <EmptyState />
  }

  return (
    <div>
      {/* Sort controls */}
      <div className={styles.controls} role="toolbar" aria-label="Sort results">
        <span className={styles.sortPrefix}>Sort by:</span>
        {SORT_OPTIONS.map((opt, i) => (
          <span key={opt.key} className={styles.sortGroup}>
            {i > 0 && <span className={styles.sortDot} aria-hidden="true">·</span>}
            <button
              className={`${styles.sortBtn} ${sortBy === opt.key ? styles.sortActive : ''}`}
              onClick={() => setSortBy(opt.key)}
              type="button"
              aria-pressed={sortBy === opt.key}
            >
              {opt.label}
            </button>
          </span>
        ))}
      </div>

      {/* Card grid */}
      <div className={styles.grid} role="list" aria-label="Asset results">
        {sorted.map((asset) => (
          <div key={asset.id} role="listitem">
            <AssetCard asset={asset} onClick={() => onCardClick?.(asset.id)} />
          </div>
        ))}
      </div>
    </div>
  )
}

function EmptyState() {
  return (
    <div className={styles.empty} role="status">
      <MagnifyingGlassIcon />
      <h3 className={styles.emptyHeading}>Nothing found yet</h3>
      <p className={styles.emptyBody}>
        This area of the catalog is still being built.
        Try a different query or browse another domain.
      </p>
    </div>
  )
}

function MagnifyingGlassIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.25" strokeLinecap="round"
      strokeLinejoin="round" aria-hidden="true"
      style={{ color: 'var(--color-text-muted)' }}>
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  )
}
