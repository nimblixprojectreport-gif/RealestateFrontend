import React, { useState } from 'react'

export default function InteractionHeatMapCard({ imageUrl, loading }: { imageUrl?: string; loading?: boolean }) {
  const [showImage, setShowImage] = useState(!!imageUrl)

  return (
    <section className="lva-card">
      <h3>Interaction Heat Map <span style={{float:'right',fontSize:12,color:'#0b5cff'}}>View Full</span></h3>
      <div style={{marginTop:12}}>
        {showImage && imageUrl ? (
          <img
            src={imageUrl}
            alt="Interaction heatmap"
            style={{width:'100%',borderRadius:10}}
            onError={() => setShowImage(false)}
          />
        ) : (
          <div style={{width:'100%',borderRadius:10,background:'#f8fafc',padding:12,boxSizing:'border-box'}}>
            <div style={{width:'100%',height:140,borderRadius:8,background:'linear-gradient(180deg,#fff 0%,#eef2ff 100%)',display:'flex',alignItems:'center',justifyContent:'center',color:'#9ca3af'}}>Heatmap preview</div>
            <div style={{display:'flex',gap:8,marginTop:10,justifyContent:'flex-start'}}>
              <div style={{background:'#fff6f0',padding:'6px 8px',borderRadius:8,fontSize:12}}>High Engagement: Images</div>
              <div style={{background:'#fff8e6',padding:'6px 8px',borderRadius:8,fontSize:12}}>Medium: "Book Tour"</div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
