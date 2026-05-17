import { useNavigate } from 'react-router-dom'
import NavBar from '../components/layout/NavBar'
import IntentBar from '../components/intent/IntentBar'
import DomainGrid from '../components/catalog/DomainGrid'
import FlagshipShowcase from '../components/catalog/FlagshipShowcase'
import PreviewPanel from '../components/preview/PreviewPanel'
import { usePreviewPanel } from '../hooks/usePreviewPanel'
import styles from './HomePage.module.css'

export default function HomePage() {
  const navigate = useNavigate()
  const { selectedAssetId, openPanel, closePanel } = usePreviewPanel()

  return (
    <>
      <div className={styles.page}>
        <NavBar />

        <main className={styles.main}>

          {/* ── Hero block ── */}
          <section className={styles.hero} aria-label="Search">
            <div className={styles.heroContent}>
              <p className={styles.eyebrow}>Life Sciences AI &amp; Data Practice</p>

              <h1 className={styles.heading}>
                <span className={styles.headingLine1}>Find the work</span>
                <span className={styles.headingLine2}>that moves things forward.</span>
              </h1>

              <p className={styles.subheading}>
                The practice's best thinking on AI and data in Life Sciences —
                searchable, retrievable, ready to apply.
              </p>

              <div className={styles.intentBarWrap}>
                <IntentBar variant="hero" />
              </div>

              <p className={styles.quickStart}>Or explore by domain below →</p>
            </div>
          </section>

          {/* ── Domain tile grid ── */}
          <section className={styles.domainSection} aria-label="Browse by domain">
            <DomainGrid onDomainClick={(id) => navigate(`/browse/${id}`)} />
          </section>

          {/* ── Flagship showcase ── */}
          <section className={styles.showcaseSection}>
            <FlagshipShowcase onCardClick={openPanel} />
          </section>

        </main>
      </div>

      <PreviewPanel selectedAssetId={selectedAssetId} onClose={closePanel} />
    </>
  )
}
