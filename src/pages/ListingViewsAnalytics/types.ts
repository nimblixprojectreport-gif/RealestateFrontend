export interface ReferralItem {
  name: string
  value: number
  percent: number
  delta?: number
}

export interface ListingViewsData {
  total: number
  referralBreakdown: ReferralItem[]
  heatmapUrl?: string
  trafficList: ReferralItem[]
}
