import { assets } from '../../data/assets'
import styles from './RelatedDocuments.module.css'

export default function RelatedDocuments({ relatedIds, onSelect }) {
  if (!relatedIds?.length) return null

  const related = relatedIds
    .map((id) => assets.find((a) => a.id === id))
    .filter(Boolean)
    .slice(0, 3)

  if (!related.length) return null

  return (
    <section aria-labelledby="related-heading">
      <h3 className={styles.heading} id="related-heading">Related Assets</h3>
      <ul className={styles.list}>
        {related.map((asset) => (
          <li key={asset.id}>
            <button
              className={styles.item}
              onClick={() => onSelect(asset.id)}
              type="button"
            >
              <span className={styles.itemTitle}>{asset.title}</span>
              <span className={styles.itemMeta}>
                {asset.qualityTier} · {asset.engagementYear}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </section>
  )
}
