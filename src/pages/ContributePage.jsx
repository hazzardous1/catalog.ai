import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import PageLayout from '../components/layout/PageLayout'
import UploadZone from '../components/contribute/UploadZone'
import MetadataForm from '../components/contribute/MetadataForm'
import Toast from '../components/ui/Toast'
import styles from './ContributePage.module.css'

// State machine: upload → checking → [duplicate?] → processing → metadata → publishing → (toast + navigate)

export default function ContributePage() {
  const navigate = useNavigate()
  const [step, setStep]               = useState('upload')
  const [file, setFile]               = useState(null)
  const [sharePointUrl, setSharePointUrl] = useState('')
  const [showToast, setShowToast]     = useState(false)

  const handleFile = (f) => {
    setFile(f)
    setStep('checking')
  }

  const handleSharePointSubmit = (e) => {
    e.preventDefault()
    if (sharePointUrl.trim()) setStep('checking')
  }

  // Duplicate check — 1.5s, triggers on filename or URL containing 'clinical' / 'data-operating'
  useEffect(() => {
    if (step !== 'checking') return
    const name = (file?.name ?? sharePointUrl).toLowerCase()
    const t = setTimeout(() => {
      const hasDuplicate = name.includes('clinical') || name.includes('data-operating')
      setStep(hasDuplicate ? 'duplicate' : 'processing')
    }, 1500)
    return () => clearTimeout(t)
  }, [step, file, sharePointUrl])

  // Processing — 2s AI analysis simulation
  useEffect(() => {
    if (step !== 'processing') return
    const t = setTimeout(() => setStep('metadata'), 2000)
    return () => clearTimeout(t)
  }, [step])

  // Publishing — 1s save → toast → 1.5s → redirect
  useEffect(() => {
    if (step !== 'publishing') return
    const t = setTimeout(() => {
      setShowToast(true)
      setTimeout(() => navigate('/search?q=clinical'), 1500)
    }, 1000)
    return () => clearTimeout(t)
  }, [step, navigate])

  const resetToUpload = () => {
    setFile(null)
    setSharePointUrl('')
    setStep('upload')
  }

  const showZone     = ['upload', 'checking', 'duplicate', 'processing'].includes(step)
  const showOrForm   = step === 'upload'
  const showDuplicate = step === 'duplicate'
  const showMetadata  = step === 'metadata' || step === 'publishing'
  const zoneState    = step === 'checking' ? 'checking' : step === 'processing' ? 'processing' : 'idle'

  return (
    <PageLayout>
      <div className={styles.page}>
        <div className={styles.container}>

          {/* Header */}
          <div className={styles.header}>
            <h1 className={styles.title}>Contribute an Asset</h1>
            <p className={styles.subtitle}>Share work that the practice can learn from.</p>
          </div>

          {/* Step 1 — Upload zone */}
          {showZone && (
            <UploadZone uploadState={zoneState} onFile={handleFile} />
          )}

          {/* Duplicate detection alert */}
          {showDuplicate && (
            <div className={styles.duplicateAlert} role="alert">
              <p className={styles.duplicateMsg}>
                ⚠ A similar document already exists:{' '}
                <strong>AI-Enabled Clinical Trial Optimization: A Framework for Mid-Size Biotechs</strong>
              </p>
              <div className={styles.duplicateActions}>
                <button
                  type="button"
                  className={styles.proceedBtn}
                  onClick={() => setStep('processing')}
                >
                  Proceed as new
                </button>
                <button
                  type="button"
                  className={styles.linkBtn}
                  onClick={() => setStep('processing')}
                >
                  Link as version
                </button>
                <button
                  type="button"
                  className={styles.cancelDupBtn}
                  onClick={resetToUpload}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {/* OR divider + SharePoint input — upload state only */}
          {showOrForm && (
            <>
              <div className={styles.orDivider} aria-hidden="true">
                <div className={styles.orLine} />
                <span className={styles.orText}>or</span>
                <div className={styles.orLine} />
              </div>

              <form onSubmit={handleSharePointSubmit} className={styles.spForm}>
                <label className={styles.spLabel} htmlFor="sp-url">
                  Or paste a SharePoint link
                </label>
                <div className={styles.spRow}>
                  <input
                    id="sp-url"
                    type="url"
                    className={styles.spInput}
                    placeholder="https://accenture.sharepoint.com/…"
                    value={sharePointUrl}
                    onChange={(e) => setSharePointUrl(e.target.value)}
                  />
                  <button
                    type="submit"
                    className={styles.spBtn}
                    disabled={!sharePointUrl.trim()}
                  >
                    Link
                  </button>
                </div>
              </form>
            </>
          )}

          {/* Step 2 — Metadata form */}
          {showMetadata && (
            <MetadataForm
              onPublish={() => setStep('publishing')}
              isPublishing={step === 'publishing'}
            />
          )}

          {/* Cancel */}
          <button
            type="button"
            className={styles.cancelLink}
            onClick={() => navigate('/')}
          >
            Cancel
          </button>

        </div>
      </div>

      {showToast && (
        <Toast
          message="Asset published successfully."
          variant="success"
          duration={5000}
          onDismiss={() => setShowToast(false)}
        />
      )}
    </PageLayout>
  )
}
