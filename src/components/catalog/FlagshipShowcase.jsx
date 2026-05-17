import { assets } from '../../data/assets'
import AssetCard from './AssetCard'
import styles from './FlagshipShowcase.module.css'

const flagshipAssets = assets.filter((a) => a.qualityTier === 'Flagship').slice(0, 10)

export default function FlagshipShowcase({ onCardClick }) {
  return (
    <section className={styles.section} aria-labelledby="flagship-heading">
      <div className={styles.header}>
        <div>
          <p className={styles.label} id="flagship-heading">Flagship Assets</p>
          <p className={styles.subtitle}>Leadership-reviewed. Best-in-class.</p>
        </div>
      </div>
      <div className={styles.scrollRow} role="list">
        {flagshipAssets.map((asset) => (
          <div key={asset.id} className={styles.cardSlot} role="listitem">
            <AssetCard asset={asset} onClick={() => onCardClick?.(asset.id)} />
          </div>
        ))}
      </div>
    </section>
  )
}
