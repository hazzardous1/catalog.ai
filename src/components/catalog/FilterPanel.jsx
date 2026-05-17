import { useState } from 'react'
import { assets as allAssets } from '../../data/assets'
import styles from './FilterPanel.module.css'

// Derive stable option lists from the full mock dataset
const ALL_ASSET_TYPES = [...new Set(allAssets.map((a) => a.assetType))]
const ALL_DOMAINS    = [...new Set(allAssets.flatMap((a) => a.capabilityDomain))].sort()
const ALL_SEGMENTS   = [...new Set(allAssets.flatMap((a) => a.segment))].sort()
const ALL_TIERS      = ['Flagship', 'Standard', 'Reference']
const ALL_YEARS      = [...new Set(allAssets.map((a) => String(a.engagementYear)))].sort().reverse()

const SECTIONS = [
  { key: 'assetType',        label: 'Asset Type',             options: ALL_ASSET_TYPES },
  { key: 'capabilityDomain', label: 'Capability Domain',      options: ALL_DOMAINS     },
  { key: 'segment',          label: 'Life Sciences Segment',   options: ALL_SEGMENTS    },
  { key: 'qualityTier',      label: 'Quality Tier',           options: ALL_TIERS       },
  { key: 'engagementYear',   label: 'Engagement Year',        options: ALL_YEARS       },
]

export default function FilterPanel({ filters, onChange, onClear }) {
  const [collapsed, setCollapsed] = useState({})

  const toggleSection = (key) =>
    setCollapsed((c) => ({ ...c, [key]: !c[key] }))

  const totalActive = Object.values(filters).reduce((n, arr) => n + arr.length, 0)

  return (
    <aside className={styles.panel} aria-label="Filter assets">
      <div className={styles.topRow}>
        <span className={styles.panelTitle}>Filters</span>
        {totalActive > 0 && (
          <button className={styles.clearAll} onClick={onClear} type="button">
            Clear all
          </button>
        )}
      </div>

      {SECTIONS.map(({ key, label, options }) => (
        <FilterSection
          key={key}
          label={label}
          options={options}
          selected={filters[key]}
          activeCount={filters[key].length}
          isCollapsed={!!collapsed[key]}
          onToggle={() => toggleSection(key)}
          onChange={(val) => onChange(key, val)}
        />
      ))}
    </aside>
  )
}

function FilterSection({ label, options, selected, activeCount, isCollapsed, onToggle, onChange }) {
  return (
    <div className={styles.section}>
      <button
        className={styles.sectionHeader}
        onClick={onToggle}
        type="button"
        aria-expanded={!isCollapsed}
      >
        <span className={styles.sectionLabel}>{label}</span>
        <div className={styles.sectionRight}>
          {activeCount > 0 && (
            <span className={styles.countBadge} aria-label={`${activeCount} active`}>
              {activeCount}
            </span>
          )}
          <ChevronIcon collapsed={isCollapsed} />
        </div>
      </button>

      {!isCollapsed && (
        <ul className={styles.optionList} role="list">
          {options.map((opt) => {
            const checked = selected.includes(opt)
            const id = `filter-${label}-${opt}`.replace(/\s+/g, '-').toLowerCase()
            return (
              <li key={opt} className={styles.optionItem}>
                <label className={styles.optionLabel} htmlFor={id}>
                  <input
                    id={id}
                    type="checkbox"
                    className={styles.checkbox}
                    checked={checked}
                    onChange={() => onChange(opt)}
                  />
                  <span className={styles.optionText}>{opt}</span>
                </label>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}

function ChevronIcon({ collapsed }) {
  return (
    <svg
      width="14" height="14" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round"
      strokeLinejoin="round" aria-hidden="true"
      style={{ transform: collapsed ? 'rotate(-90deg)' : 'none', transition: 'transform 150ms ease' }}
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  )
}
