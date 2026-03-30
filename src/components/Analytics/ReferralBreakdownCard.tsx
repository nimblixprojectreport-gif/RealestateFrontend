import React from 'react'
import sample from '../../pages/ListingViewsAnalytics/sample-data.json'

type Item = { name: string; value: number; percent: number }

const COLORS = ['#0b5cff', '#60a5fa', '#a2d2ff', '#7dd3fc', '#c7f9ff']

function polarToCartesian(cx: number, cy: number, r: number, angleDeg: number) {
  const angleRad = ((angleDeg - 90) * Math.PI) / 180.0
  return { x: cx + r * Math.cos(angleRad), y: cy + r * Math.sin(angleRad) }
}

function describeSector(cx: number, cy: number, r: number, startAngle: number, endAngle: number) {
  const start = polarToCartesian(cx, cy, r, endAngle)
  const end = polarToCartesian(cx, cy, r, startAngle)
  const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1'
  return `M ${cx} ${cy} L ${start.x} ${start.y} A ${r} ${r} 0 ${largeArcFlag} 0 ${end.x} ${end.y} Z`
}

export default function ReferralBreakdownCard({ data, total, loading }: { data: Item[]; total: number; loading?: boolean }) {
  const fallback = (sample && (sample as any).referralBreakdown) || []
  const displayData: Item[] = (data && data.length > 0) ? data : fallback
  const displayTotal: number = (total && total > 0) ? total : ((sample as any).total || 0)

  // compute slices from percent
  const slices = displayData.map((d) => ({ ...d }))
  let angleCursor = 0
  const sectors = slices.map((s) => {
    const start = angleCursor
    const sweep = (s.percent / 100) * 360
    const end = angleCursor + sweep
    angleCursor = end
    return { ...s, startAngle: start, endAngle: end }
  })

  return (
    <section className="lva-card">
      <h3>Referral Breakdown</h3>
      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        <div style={{ width: 140, height: 110 }}>
          <div style={{ width: 120, height: 120, overflow: 'hidden', borderRadius: 12 }}>
            <svg viewBox="0 0 100 100" width="100%" height="100%" preserveAspectRatio="xMidYMid meet">
              <defs>
                <clipPath id="squareClip">
                  <rect x="6" y="6" width="88" height="88" rx="10" ry="10" />
                </clipPath>
              </defs>

              <g clipPath="url(#squareClip)">
                {sectors.map((sec, i) => (
                  <path key={sec.name} d={describeSector(50, 50, 40, sec.startAngle, sec.endAngle)} fill={COLORS[i % COLORS.length]} />
                ))}
              </g>

              {/* subtle border for the rounded square */}
              <rect x="6" y="6" width="88" height="88" rx="10" ry="10" fill="none" stroke="rgba(15,23,42,0.04)" />
            </svg>
          </div>
        </div>

        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 28, fontWeight: 700 }}>{displayTotal.toLocaleString()}</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 8 }}>
            {displayData.map((d, i) => (
              <div key={d.name} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ width: 10, height: 10, background: COLORS[i % COLORS.length], borderRadius: 6, display: 'inline-block' }} />
                  <span>{d.name}</span>
                </div>
                <div>{d.percent}%</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
