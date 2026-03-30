import React from 'react'

export default function EngagementMetricsCard({ total, loading }: { total?: number; loading?: boolean }) {
  const views = total ?? 0
  // simple derived metrics for display
  const avgTime = '1m 42s'
  const avgClicks = 2.3
  const toursBooked = Math.round((views / 1000) * 2) // small derived number

  return (
    <section className="lva-card">
      <h3>Engagement Metrics</h3>
      <div style={{display:'flex',gap:12,alignItems:'center',marginTop:8}}>
        <div style={{flex:1}}>
          <div style={{fontSize:28,fontWeight:700}}>{views.toLocaleString()}</div>
          <div style={{fontSize:12,color:'#6b7280'}}>Total Views</div>
        </div>

        <div style={{display:'flex',flexDirection:'column',gap:8,minWidth:120}}>
          <div style={{background:'#fff',padding:8,borderRadius:8,textAlign:'center'}}>Avg time<br/><strong>{avgTime}</strong></div>
          <div style={{background:'#fff',padding:8,borderRadius:8,textAlign:'center'}}>Avg clicks<br/><strong>{avgClicks}</strong></div>
          <div style={{background:'#fff',padding:8,borderRadius:8,textAlign:'center'}}>Tours<br/><strong>{toursBooked}</strong></div>
        </div>
      </div>
    </section>
  )
}
