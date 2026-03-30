import axios from 'axios'
import type { ListingViewsData } from './types'

const MOCK: ListingViewsData = {
  total: 24500,
  referralBreakdown: [
    { name: 'Search', value: 14700, percent: 60, delta: 8.2 },
    { name: 'Social', value: 6125, percent: 25, delta: 24.5 },
    { name: 'Direct', value: 3675, percent: 15, delta: -2.1 }
  ],
  heatmapUrl: '/assets/images/LandingPage/Property/heatmap-placeholder.jpg',
  trafficList: [
    { name: 'Google Search', value: 14700, percent: 60, delta: 8.2 },
    { name: 'Instagram', value: 6125, percent: 25, delta: 24.5 },
    { name: 'Direct URL', value: 3675, percent: 15, delta: -2.1 }
  ]
}

export async function fetchListingViews(): Promise<ListingViewsData> {
  try {
    const res = await axios.get('/api/analytics/listing-views')
    // Expect server to return compatible shape; otherwise fallback to mock
    if (res && res.data) return res.data as ListingViewsData
  } catch (err) {
    // swallow and use mock
  }
  return MOCK
}
