import { useRef, useState } from 'react'
import styles from './UploadZone.module.css'

export default function UploadZone({ uploadState, onFile }) {
  const [isDragOver, setIsDragOver] = useState(false)
  const inputRef = useRef(null)

  const isLoading = uploadState === 'checking' || uploadState === 'processing'
  const loadingText = uploadState === 'checking' ? 'Checking for duplicates…' : 'Analyzing document…'

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragOver(false)
    if (isLoading) return
    const file = e.dataTransfer.files[0]
    if (file) onFile(file)
  }

  const handleClick = () => {
    if (!isLoading) inputRef.current?.click()
  }

  return (
    <div
      className={[
        styles.zone,
        isDragOver && !isLoading ? styles.dragOver : '',
        isLoading ? styles.pulsing : '',
      ].filter(Boolean).join(' ')}
      onDragOver={(e) => { e.preventDefault(); if (!isLoading) setIsDragOver(true) }}
      onDragLeave={() => setIsDragOver(false)}
      onDrop={handleDrop}
      onClick={handleClick}
      role="button"
      tabIndex={isLoading ? -1 : 0}
      aria-label="Upload zone — drop files here or click to browse"
      onKeyDown={(e) => {
        if (!isLoading && (e.key === 'Enter' || e.key === ' ')) handleClick()
      }}
    >
      <input
        ref={inputRef}
        type="file"
        accept=".pdf,.pptx,.docx,.xlsx"
        className={styles.hiddenInput}
        onChange={(e) => { if (e.target.files[0]) onFile(e.target.files[0]) }}
      />

      {isLoading ? (
        <p className={styles.loadingText}>{loadingText}</p>
      ) : (
        <>
          <UploadIcon />
          <p className={styles.dropText}>
            Drop files here, or <span className={styles.browseLink}>browse</span>
          </p>
          <p className={styles.formatsText}>PDF, PPTX, DOCX, XLSX · Max 100MB</p>
        </>
      )}
    </div>
  )
}

function UploadIcon() {
  return (
    <svg
      width="36" height="36" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.25" strokeLinecap="round"
      strokeLinejoin="round" aria-hidden="true"
      className={styles.icon}
    >
      <polyline points="16 16 12 12 8 16" />
      <line x1="12" y1="12" x2="12" y2="21" />
      <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" />
    </svg>
  )
}
