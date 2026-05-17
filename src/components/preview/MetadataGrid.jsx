import styles from './MetadataGrid.module.css'

const fields = (asset) => [
  { label: 'Life Sciences Segment', value: asset.segment.join(', ') },
  { label: 'Capability Domain',     value: asset.capabilityDomain.join(', ') },
  { label: 'Therapeutic Area',      value: asset.therapeuticArea.join(', ') },
  { label: 'Engagement Year',       value: String(asset.engagementYear) },
  { label: 'Geography',             value: asset.geography.join(', ') },
  { label: 'Contributing Team',     value: asset.contributingTeam },
  { label: 'Confidentiality',       value: asset.confidentialityLevel },
  { label: 'Keywords',              value: asset.keywords, isKeywords: true },
]

export default function MetadataGrid({ asset }) {
  return (
    <dl className={styles.grid}>
      {fields(asset).map(({ label, value, isKeywords }) => (
        <div key={label} className={styles.cell}>
          <dt className={styles.label}>{label}</dt>
          <dd className={styles.value}>
            {isKeywords ? (
              <span className={styles.tagList}>
                {value.map((tag) => (
                  <span key={tag} className={styles.tag}>{tag}</span>
                ))}
              </span>
            ) : (
              value || '—'
            )}
          </dd>
        </div>
      ))}
    </dl>
  )
}
