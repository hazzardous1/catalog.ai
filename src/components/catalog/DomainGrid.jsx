import { domains } from '../../data/domains'
import DomainTile from './DomainTile'
import styles from './DomainGrid.module.css'

export default function DomainGrid({ activeDomainId, onDomainClick }) {
  return (
    <div className={styles.grid}>
      {domains.map((domain) => (
        <DomainTile
          key={domain.id}
          domain={domain}
          isActive={activeDomainId === domain.id}
          onClick={() => onDomainClick?.(domain.id)}
        />
      ))}
    </div>
  )
}
