import React from 'react'

type DemoItem = { label: string; percent: number }

const FALLBACK: DemoItem[] = [
  { label: '18-24', percent: 12 },
  { label: '25-34', percent: 45 },
  { label: '35-44', percent: 28 },
  { label: '45+', percent: 15 },
]

function Bar({ percent }: { percent: number }) {
  return (
    <div style={{background:'#eef2ff',borderRadius:8,height:10,overflow:'hidden'}}>
      <div style={{width:`${Math.max(2, percent)}%`,height:'100%',background:'#0b5cff'}} />
    </div>
  )
}

export default function DemographicsCard({ loading }: { loading?: boolean }) {
  const data = FALLBACK

  return (
    <section className="lva-card">
      <h3>Demographics</h3>
      <div style={{marginTop:10,display:'flex',flexDirection:'column',gap:12}}>
        {data.map((d) => (
          <div key={d.label} style={{display:'flex',flexDirection:'column',gap:6}}>
            <div style={{display:'flex',justifyContent:'space-between'}}> 
              <div style={{fontWeight:600}}>{d.label}</div>
              <div style={{color:'#6b7280'}}>{d.percent}%</div>
            </div>
            <Bar percent={d.percent} />
          </div>
        ))}
      </div>
    </section>
  )
}
