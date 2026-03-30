import React from 'react'

type Item = { name: string; channel?: string; value: number; percent: number; delta?: number }

export default function TrafficListCard({ items = [], loading }: { items?: Item[]; loading?: boolean }) {
  const safeItems = Array.isArray(items) ? items : []

  return (
    <section className="lva-card">
      <h3>Traffic Sources</h3>
      <div className="lva-legend">
        {safeItems.length === 0 ? (
          <div style={{color:'#6b7280',padding:12}}>No traffic data available</div>
        ) : (
          safeItems.map((it) => (
            <div key={it.name} className="traffic-list-item">
              <div>
                <div style={{fontWeight:600}}>{it.name}</div>
                <div style={{fontSize:12,color:'#6b7280'}}>{it.channel ?? 'Referral'}</div>
              </div>
              <div style={{textAlign:'right'}}>
                <div style={{fontWeight:600}}>{(it.value ?? 0).toLocaleString()}</div>
                <div className={(typeof it.delta === 'number' && it.delta > 0) ? 'delta-positive' : 'delta-negative'} style={{fontSize:12}}>
                  {typeof it.delta === 'number' ? `${it.delta > 0 ? '+' : ''}${it.delta}%` : ''}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  )
}
