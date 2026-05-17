import { useState, useMemo, useEffect } from 'react'
import { useSearchParams, useParams } from 'react-router-dom'
import PageLayout from '../components/layout/PageLayout'
import FilterPanel from '../components/catalog/FilterPanel'
import AssetGrid from '../components/catalog/AssetGrid'
import AgentResponseBlock from '../components/agent/AgentResponseBlock'
import PreviewPanel from '../components/preview/PreviewPanel'
import { useSearch } from '../hooks/useSearch'
import { usePreviewPanel } from '../hooks/usePreviewPanel'
import { assets as allAssets } from '../data/assets'
import { domains } from '../data/domains'
import styles from './ResultsPage.module.css'

function normalize(str) {
  return str.toLowerCase().replace(/[^a-z0-9]/g, '')
}

const EMPTY_FILTERS = {
  assetType:        [],
  capabilityDomain: [],
  segment:          [],
  qualityTier:      [],
  engagementYear:   [],
}

function applyFilters(assets, filters) {
  return assets.filter((a) => {
    if (filters.assetType.length && !filters.assetType.includes(a.assetType))
      return false
    if (
      filters.capabilityDomain.length &&
      !a.capabilityDomain.some((d) => filters.capabilityDomain.includes(d))
    )
      return false
    if (filters.segment.length && !a.segment.some((s) => filters.segment.includes(s)))
      return false
    if (filters.qualityTier.length && !filters.qualityTier.includes(a.qualityTier))
      return false
    if (
      filters.engagementYear.length &&
      !filters.engagementYear.includes(String(a.engagementYear))
    )
      return false
    return true
  })
}

export default function ResultsPage() {
  const [searchParams] = useSearchParams()
  const { domainId } = useParams()
  const { selectedAssetId, openPanel, closePanel } = usePreviewPanel()
  const [filters, setFilters] = useState(EMPTY_FILTERS)

  const query      = searchParams.get('q') ?? ''
  const isSearch   = !domainId

  // Reset filters when the route context changes
  useEffect(() => {
    setFilters(EMPTY_FILTERS)
  }, [query, domainId])

  // Mode A — intent bar search
  const { assets: searchResults, agentResponse } = useSearch(isSearch ? query : '')

  // Mode B — domain browse
  const domain = domains.find((d) => d.id === domainId)
  const browseResults = useMemo(() => {
    if (!domainId || !domain) return []
    const norm = normalize(domain.label)
    return allAssets.filter((a) =>
      a.capabilityDomain.some((d) => normalize(d) === norm)
    )
  }, [domainId, domain])

  const baseResults = isSearch ? searchResults : browseResults
  const filtered    = useMemo(() => applyFilters(baseResults, filters), [baseResults, filters])

  const heading = isSearch
    ? `Results for: "${query}"`
    : `Browsing: ${domain?.label ?? domainId}`

  const handleFilterChange = (category, value) => {
    setFilters((prev) => {
      const current = prev[category]
      const next = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value]
      return { ...prev, [category]: next }
    })
  }

  return (
    <>
    <PageLayout>
      <div className={styles.layout}>

        {/* ── Left filter rail ── */}
        <div className={styles.filterRail}>
          <FilterPanel
            filters={filters}
            onChange={handleFilterChange}
            onClear={() => setFilters(EMPTY_FILTERS)}
          />
        </div>

        {/* ── Main content ── */}
        <div className={styles.content}>

          {/* Query echo */}
          <div className={styles.queryEcho}>
            <h1 className={styles.heading}>{heading}</h1>
            <p className={styles.count}>
              {filtered.length} asset{filtered.length !== 1 ? 's' : ''} found
            </p>
          </div>

          {/* Agent response block — Mode A only */}
          {isSearch && agentResponse && (
            <div className={styles.agentWrap}>
              <AgentResponseBlock
                response={agentResponse}
                onCitationClick={openPanel}
              />
            </div>
          )}

          {/* Asset grid */}
          <AssetGrid assets={filtered} onCardClick={openPanel} />

        </div>
      </div>
    </PageLayout>
    <PreviewPanel selectedAssetId={selectedAssetId} onClose={closePanel} />
    </>
  )
}
