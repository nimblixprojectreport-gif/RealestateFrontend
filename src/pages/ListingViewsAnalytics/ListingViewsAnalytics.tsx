import React, { useEffect, useState } from 'react'
import './ListingViewsAnalytics.css'
import { fetchListingViews } from './service'
import type { ListingViewsData } from './types'
import sampleData from './sample-data.json'
import ReferralBreakdownCard from '../../components/Analytics/ReferralBreakdownCard'
import InteractionHeatMapCard from '../../components/Analytics/InteractionHeatMapCard'
import TrafficListCard from '../../components/Analytics/TrafficListCard'
import EngagementMetricsCard from '../../components/Analytics/EngagementMetricsCard'
import DemographicsCard from '../../components/Analytics/DemographicsCard'

const ListingViewsAnalytics: React.FC = () => {
  const [data, setData] = useState<ListingViewsData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetchListingViews()
        setData(res)
      } catch (err) {
        console.error('Failed loading analytics', err)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  // use fetched data when available, otherwise fall back to local sample data
  const effectiveData: ListingViewsData = data ?? (sampleData as ListingViewsData)

  const [tab, setTab] = useState<'traffic' | 'engagement' | 'demographics'>('traffic')

  return (
    <div className="lva-page">
      <header className="lva-header">
        <button className="lva-back" aria-label="back">←</button>
        <h1>Listing Views Analytics</h1>
        <button className="lva-share" aria-label="share">⤴</button>
      </header>

      <div className="lva-tabs">
        <button className={tab === 'traffic' ? 'active' : ''} onClick={() => setTab('traffic')}>Traffic</button>
        <button className={tab === 'engagement' ? 'active' : ''} onClick={() => setTab('engagement')}>Engagement</button>
        <button className={tab === 'demographics' ? 'active' : ''} onClick={() => setTab('demographics')}>Demographics</button>
      </div>

      <main className="lva-content">
        {tab === 'traffic' && (
          <>
            <ReferralBreakdownCard data={effectiveData.referralBreakdown} total={effectiveData.total} loading={loading} />
            <InteractionHeatMapCard imageUrl={effectiveData.heatmapUrl} loading={loading} />
            <TrafficListCard items={effectiveData.trafficList} loading={loading} />
          </>
        )}

        {tab === 'engagement' && (
          <>
            <EngagementMetricsCard total={effectiveData.total} loading={loading} />
            <InteractionHeatMapCard imageUrl={effectiveData.heatmapUrl} loading={loading} />
          </>
        )}

        {tab === 'demographics' && (
          <>
            <DemographicsCard loading={loading} />
          </>
        )}
      </main>
    </div>
  )
}

export default ListingViewsAnalytics
