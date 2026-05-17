import { useMemo } from 'react'
import { assets } from '../data/assets'
import { agentResponses } from '../data/agentResponses'

export function useSearch(query) {
  return useMemo(() => {
    if (!query) return { assets: [], agentResponse: null }

    const q = query.toLowerCase()

    const matched = assets.filter(a =>
      a.title.toLowerCase().includes(q) ||
      a.summary.toLowerCase().includes(q) ||
      a.keywords.some(k => k.toLowerCase().includes(q)) ||
      a.capabilityDomain.some(d => d.toLowerCase().includes(q))
    )

    const agentResponse =
      agentResponses.find(r =>
        r.queryMatch.some(term => q.includes(term.toLowerCase()))
      ) ?? agentResponses[agentResponses.length - 1]

    return { assets: matched, agentResponse }
  }, [query])
}
