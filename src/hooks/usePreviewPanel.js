import { useState, useEffect } from 'react'

export function usePreviewPanel() {
  const [selectedAssetId, setSelectedAssetId] = useState(null)

  useEffect(() => {
    const base = window.location.pathname + window.location.search
    if (selectedAssetId) {
      history.replaceState(null, '', `${base}#asset-${selectedAssetId}`)
    } else {
      history.replaceState(null, '', base)
    }
  }, [selectedAssetId])

  const openPanel  = (id) => setSelectedAssetId(id)
  const closePanel = ()   => setSelectedAssetId(null)

  return { selectedAssetId, openPanel, closePanel }
}
