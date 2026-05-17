import { useState } from 'react'
import ConfidenceBadge from './ConfidenceBadge'
import styles from './MetadataForm.module.css'

const DEFAULT = {
  title: 'AI-Enabled Clinical Trial Optimization: A Framework for Mid-Size Biotechs',
  assetType: 'Framework / Methodology',
  subType: '',
  segment: ['Biotech'],
  therapeuticArea: ['Oncology', 'Rare Disease'],
  capabilityDomain: ['Digital Core / AI', 'Industry & Enterprise'],
  client: 'Mid-size oncology biotech, US',
  engagementYear: '2024',
  geography: ['North America'],
  qualityTier: 'Standard',
  confidentialityLevel: 'Sanitized for Reuse',
  keywords: ['clinical trials', 'AI', 'optimization', 'patient recruitment'],
  contributingTeam: 'LS AI & Data, Clinical Practice',
  summary:
    'This framework outlines a structured approach to applying AI across four phases of clinical trial design and execution for mid-size biotechs. It addresses patient recruitment optimization, protocol deviation prediction, real-time safety signal detection, and site performance benchmarking. Developed through two client engagements in 2023–2024, the methodology has been validated across oncology and rare disease contexts. Key tools include predictive recruitment models and an AI-assisted protocol review layer.',
}

const CONFIDENCE = {
  title:             'High',
  assetType:         'High',
  subType:           'Low',
  segment:           'High',
  therapeuticArea:   'Medium',
  capabilityDomain:  'High',
  client:            'Low',
  engagementYear:    'High',
  geography:         'Medium',
  qualityTier:       'High',
  confidentialityLevel: 'Medium',
  keywords:          'Medium',
  contributingTeam:  'Low',
  summary:           'High',
}

const ASSET_TYPES    = ['Framework / Methodology', 'Point of View', 'Case Study', 'Training Material', 'Template', 'Tool / Accelerator', 'Presentation', 'Research']
const SEGMENTS       = ['Pharma', 'Biotech', 'MedTech', 'Payer', 'CRO']
const THERAPEUTICS   = ['Oncology', 'Rare Disease', 'Neurology', 'Immunology', 'Cardiovascular', 'Respiratory', 'Infectious Disease', 'Gene Therapy']
const DOMAINS        = ['Industry & Enterprise', 'Song', 'Supply Chain & Engineering', 'Finance', 'Talent', 'Cyber', 'Digital Core / AI', 'Reinvention Delivery']
const GEOGRAPHIES    = ['North America', 'Europe', 'APAC', 'LATAM', 'Global']
const QUALITY_TIERS  = ['Standard', 'Flagship', 'Reference']
const CONF_LEVELS    = ['Internal Only', 'Sanitized for Reuse', 'Restricted']
const YEARS          = ['2019', '2020', '2021', '2022', '2023', '2024', '2025']

function isValid(meta) {
  return (
    meta.title.trim().length > 0 &&
    meta.assetType.length > 0 &&
    meta.segment.length > 0 &&
    meta.capabilityDomain.length > 0 &&
    meta.engagementYear.length > 0 &&
    meta.qualityTier.length > 0 &&
    meta.confidentialityLevel.length > 0
  )
}

export default function MetadataForm({ onPublish, isPublishing }) {
  const [meta, setMeta]       = useState(DEFAULT)
  const [tagInput, setTagInput] = useState('')

  const set = (field, value) => setMeta((prev) => ({ ...prev, [field]: value }))

  const toggle = (field, value) =>
    setMeta((prev) => {
      const arr  = prev[field]
      const next = arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value]
      return { ...prev, [field]: next }
    })

  const removeKeyword = (kw) => set('keywords', meta.keywords.filter((k) => k !== kw))

  const handleTagKey = (e) => {
    if (e.key !== 'Enter' && e.key !== ',') return
    e.preventDefault()
    const val = tagInput.trim().replace(/,$/, '')
    if (val && !meta.keywords.includes(val)) set('keywords', [...meta.keywords, val])
    setTagInput('')
  }

  const canPublish = isValid(meta) && !isPublishing

  return (
    <form
      className={styles.form}
      onSubmit={(e) => { e.preventDefault(); if (canPublish) onPublish(meta) }}
      noValidate
    >
      <Field id="title" label="Document Title" confidence={CONFIDENCE.title}>
        <input
          id="title"
          className={styles.textInput}
          value={meta.title}
          onChange={(e) => set('title', e.target.value)}
        />
      </Field>

      <Field id="assetType" label="Asset Type" confidence={CONFIDENCE.assetType}>
        <select
          id="assetType"
          className={styles.select}
          value={meta.assetType}
          onChange={(e) => set('assetType', e.target.value)}
        >
          <option value="">Select type…</option>
          {ASSET_TYPES.map((t) => <option key={t}>{t}</option>)}
        </select>
      </Field>

      <Field label="Life Sciences Segment" confidence={CONFIDENCE.segment}>
        <Chips options={SEGMENTS} selected={meta.segment} onToggle={(v) => toggle('segment', v)} />
      </Field>

      <Field label="Therapeutic Area" confidence={CONFIDENCE.therapeuticArea}>
        <Chips options={THERAPEUTICS} selected={meta.therapeuticArea} onToggle={(v) => toggle('therapeuticArea', v)} />
      </Field>

      <Field label="Capability Domain" confidence={CONFIDENCE.capabilityDomain}>
        <Chips options={DOMAINS} selected={meta.capabilityDomain} onToggle={(v) => toggle('capabilityDomain', v)} />
      </Field>

      <Field id="client" label="Client (Anonymized)" confidence={CONFIDENCE.client}>
        <input
          id="client"
          className={styles.textInput}
          value={meta.client}
          onChange={(e) => set('client', e.target.value)}
        />
      </Field>

      <Field id="engagementYear" label="Engagement Year" confidence={CONFIDENCE.engagementYear}>
        <select
          id="engagementYear"
          className={styles.select}
          value={meta.engagementYear}
          onChange={(e) => set('engagementYear', e.target.value)}
        >
          <option value="">Select year…</option>
          {YEARS.map((y) => <option key={y}>{y}</option>)}
        </select>
      </Field>

      <Field label="Geography" confidence={CONFIDENCE.geography}>
        <Chips options={GEOGRAPHIES} selected={meta.geography} onToggle={(v) => toggle('geography', v)} />
      </Field>

      <Field id="qualityTier" label="Quality Tier" confidence={CONFIDENCE.qualityTier}>
        <select
          id="qualityTier"
          className={styles.select}
          value={meta.qualityTier}
          onChange={(e) => set('qualityTier', e.target.value)}
        >
          {QUALITY_TIERS.map((t) => <option key={t}>{t}</option>)}
        </select>
      </Field>

      <Field id="confidentialityLevel" label="Confidentiality Level" confidence={CONFIDENCE.confidentialityLevel}>
        <select
          id="confidentialityLevel"
          className={styles.select}
          value={meta.confidentialityLevel}
          onChange={(e) => set('confidentialityLevel', e.target.value)}
        >
          {CONF_LEVELS.map((l) => <option key={l}>{l}</option>)}
        </select>
        <p className={styles.confidNote}>
          You are responsible for ensuring this document is appropriately classified before publishing.
        </p>
      </Field>

      <Field label="Keywords / Tags" confidence={CONFIDENCE.keywords}>
        <div className={styles.tagWrapper}>
          {meta.keywords.map((kw) => (
            <span key={kw} className={styles.tag}>
              {kw}
              <button
                type="button"
                className={styles.tagRemove}
                onClick={() => removeKeyword(kw)}
                aria-label={`Remove ${kw}`}
              >
                ×
              </button>
            </span>
          ))}
          <input
            className={styles.tagInput}
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={handleTagKey}
            placeholder="Add tag…"
            aria-label="Add keyword tag"
          />
        </div>
      </Field>

      <Field id="contributingTeam" label="Contributing Team" confidence={CONFIDENCE.contributingTeam}>
        <input
          id="contributingTeam"
          className={styles.textInput}
          value={meta.contributingTeam}
          onChange={(e) => set('contributingTeam', e.target.value)}
        />
      </Field>

      <Field id="summary" label="Summary" confidence={CONFIDENCE.summary}>
        <textarea
          id="summary"
          className={styles.textarea}
          value={meta.summary}
          onChange={(e) => set('summary', e.target.value)}
          rows={5}
        />
      </Field>

      <button
        type="submit"
        className={styles.publishBtn}
        disabled={!canPublish}
        aria-disabled={!canPublish}
      >
        {isPublishing ? 'Publishing…' : 'Publish to Catalog'}
      </button>
    </form>
  )
}

function Field({ id, label, confidence, children }) {
  return (
    <div className={styles.field}>
      <div className={styles.fieldHeader}>
        {id
          ? <label className={styles.fieldLabel} htmlFor={id}>{label}</label>
          : <span  className={styles.fieldLabel}>{label}</span>
        }
        <ConfidenceBadge level={confidence} />
      </div>
      <div className={styles.fieldBody}>{children}</div>
    </div>
  )
}

function Chips({ options, selected, onToggle }) {
  return (
    <div className={styles.chips} role="group">
      {options.map((opt) => (
        <button
          key={opt}
          type="button"
          className={`${styles.chip} ${selected.includes(opt) ? styles.chipOn : ''}`}
          onClick={() => onToggle(opt)}
          aria-pressed={selected.includes(opt)}
        >
          {opt}
        </button>
      ))}
    </div>
  )
}
