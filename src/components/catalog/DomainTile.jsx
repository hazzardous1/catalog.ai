import { domainIconMap } from './DomainIcons'
import styles from './DomainTile.module.css'

export default function DomainTile({ domain, isActive, onClick }) {
  const Icon = domainIconMap[domain.icon]

  return (
    <button
      className={`${styles.tile} ${isActive ? styles.active : ''}`}
      onClick={onClick}
      type="button"
      aria-pressed={isActive}
      aria-label={`Browse ${domain.label} — ${domain.count} assets`}
    >
      <div className={styles.icon}>
        {Icon && <Icon />}
      </div>
      <p className={styles.name}>{domain.label}</p>
      <p className={styles.description}>{domain.description}</p>
      <p className={styles.count}>{domain.count} assets</p>
    </button>
  )
}
