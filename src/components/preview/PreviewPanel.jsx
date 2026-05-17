import { useEffect, useRef, useState } from 'react'
import { assets } from '../../data/assets'
import MetadataGrid from './MetadataGrid'
import RelatedDocuments from './RelatedDocuments'
import Divider from '../ui/Divider'
import Toast from '../ui/Toast'
import styles from './PreviewPanel.module.css'

export default function PreviewPanel({ selectedAssetId, onClose }) {
  // currentId can diverge from selectedAssetId when user clicks a related doc
  const [currentId, setCurrentId]           = useState(selectedAssetId)
  const [nominatedIds, setNominatedIds]     = useState(() => new Set())
  const [nominationState, setNominationState] = useState('idle') // 'idle' | 'confirming' | 'done'
  const [showToast, setShowToast]           = useState(false)
  const panelRef = useRef(null)

  // Sync current asset + reset nomination when the external selection changes
  useEffect(() => {
    setCurrentId(selectedAssetId)
    setNominationState('idle')
  }, [selectedAssetId])

  // Focus trap + Escape key
  useEffect(() => {
    if (!selectedAssetId) return

    const panel = panelRef.current
    if (!panel) return

    // Focus the close button on open
    panel.querySelector('[data-close]')?.focus()

    const getFocusable = () =>
      Array.from(
        panel.querySelectorAll(
          'button:not([disabled]), [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )
      )

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') { onClose(); return }
      if (e.key !== 'Tab') return

      const focusable = getFocusable()
      const first = focusable[0]
      const last  = focusable[focusable.length - 1]

      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last?.focus() }
      } else {
        if (document.activeElement === last)  { e.preventDefault(); first?.focus() }
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [selectedAssetId, onClose])

  if (!selectedAssetId) return null

  const asset = assets.find((a) => a.id === currentId)
  if (!asset) return null

  const isNominated = nominatedIds.has(currentId)
  const fileExt = asset.assetType.includes('Presentation') || asset.assetType.includes('Training')
    ? '.pptx'
    : '.pdf'
  const displayFilename = asset.title.slice(0, 48) + (asset.title.length > 48 ? '…' : '') + fileExt

  const handleRelatedClick = (id) => {
    setCurrentId(id)
    setNominationState('idle')
  }

  const handleConfirmNominate = () => {
    setNominatedIds((prev) => new Set([...prev, currentId]))
    setNominationState('done')
    setShowToast(true)
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className={styles.backdrop}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <div
        ref={panelRef}
        className={styles.panel}
        role="dialog"
        aria-modal="true"
        aria-label={`Asset preview: ${asset.title}`}
      >
        {/* Top bar — close button */}
        <div className={styles.topBar}>
          <button
            className={styles.closeBtn}
            onClick={onClose}
            type="button"
            aria-label="Close preview"
            data-close
          >
            ×
          </button>
        </div>

        {/* Scrollable body */}
        <div className={styles.body}>
          {/* key triggers cross-fade animation when asset changes */}
          <div className={styles.content} key={currentId}>

            {/* Badges */}
            <div className={styles.badgeRow}>
              <span className={styles.typeBadge}>{asset.assetType}</span>
              <QualityBadge tier={asset.qualityTier} />
            </div>

            {/* Title */}
            <h2 className={styles.title}>{asset.title}</h2>

            {/* Restricted flag */}
            {asset.isRestricted && (
              <div className={styles.restrictedFlag}>
                ⚠ Account team review required
              </div>
            )}

            {/* Metadata */}
            <MetadataGrid asset={asset} />

            <Divider />

            {/* Summary */}
            <section aria-labelledby="panel-summary-heading">
              <h3 className={styles.sectionHeading} id="panel-summary-heading">
                Summary
              </h3>
              <p className={styles.summaryText}>{asset.summary}</p>
            </section>

            <Divider />

            {/* Document preview placeholder */}
            <div className={styles.docPreview} aria-label="Document preview placeholder">
              <FileIcon />
              <span className={styles.docFilename}>{displayFilename}</span>
            </div>

            <Divider />

            {/* Related documents */}
            <RelatedDocuments
              relatedIds={asset.relatedDocuments}
              onSelect={handleRelatedClick}
            />

          </div>
        </div>

        {/* Sticky footer — download + nomination */}
        <div className={styles.footer}>
          <button className={styles.downloadBtn} type="button">
            Download
          </button>

          {/* Nomination area */}
          {!isNominated && nominationState === 'idle' && (
            <button
              className={styles.nominateLink}
              onClick={() => setNominationState('confirming')}
              type="button"
            >
              Nominate for Flagship
            </button>
          )}

          {nominationState === 'confirming' && (
            <div className={styles.nominateConfirm}>
              <p className={styles.nominateQuestion}>
                Nominate this asset for Flagship status? Another LT Member will be asked to confirm.
              </p>
              <div className={styles.nominateBtns}>
                <button
                  className={styles.nominateYes}
                  onClick={handleConfirmNominate}
                  type="button"
                >
                  Yes, nominate
                </button>
                <button
                  className={styles.nominateCancel}
                  onClick={() => setNominationState('idle')}
                  type="button"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {(isNominated || nominationState === 'done') && (
            <p className={styles.nominatedLabel}>✓ Nomination submitted</p>
          )}
        </div>
      </div>

      {/* Toast notification */}
      {showToast && (
        <Toast
          message="Nomination submitted. An LT Member will review."
          variant="success"
          duration={4000}
          onDismiss={() => setShowToast(false)}
        />
      )}
    </>
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

function FileIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.25" strokeLinecap="round"
      strokeLinejoin="round" aria-hidden="true"
      style={{ color: 'var(--color-text-muted)' }}>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </svg>
  )
}
