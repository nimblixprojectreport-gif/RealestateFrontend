import React from 'react'
import './MyInquiriesPage.css'
import { listings as listingsData } from '../../data/LandingPage/listings'

const statuses = ['REPLIED', 'SENT', 'CLOSED', 'REPLIED', 'SENT', 'REPLIED']
const times = ['2 hours ago', '5 hours ago', '2 days ago', '3 days ago', '1 hour ago', '4 days ago']

export default function MyInquiriesPage(){
  const [activeTab, setActiveTab] = React.useState<'All'|'Sent'|'Replied'|'Closed'>('All')

  const items = React.useMemo(() => {
    return listingsData.slice(0,6).map((p, i) => ({
      ...p,
      status: statuses[i % statuses.length],
      time: times[i % times.length]
    }))
  }, [])

  const visible = React.useMemo(() => {
    if(activeTab === 'All') return items
    return items.filter(it => it.status.toLowerCase() === activeTab.toLowerCase())
  }, [activeTab, items])

  return (
    <div className="inquiries-page page">
      <header className="inq-header">
        <button className="back"><i className="fa-solid fa-chevron-left" /></button>
        <h1>My Inquiries</h1>
        <div className="search"><i className="fa-solid fa-magnifying-glass" /></div>
      </header>

      <nav className="inq-tabs">
        <button className={activeTab === 'All' ? 'active' : ''} onClick={() => setActiveTab('All')}>All</button>
        <button className={activeTab === 'Sent' ? 'active' : ''} onClick={() => setActiveTab('Sent')}>Sent</button>
        <button className={activeTab === 'Replied' ? 'active' : ''} onClick={() => setActiveTab('Replied')}>Replied</button>
        <button className={activeTab === 'Closed' ? 'active' : ''} onClick={() => setActiveTab('Closed')}>Closed</button>
      </nav>

      <main className="inq-list">
        {visible.map((p, i) => (
          <article className="inq-card" key={p.id || i}>
            <img className="inq-thumb" src={p.image} alt={p.title} />
            <div className="inq-body">
              <div className="inq-top">
                <div className="inq-title">{p.price} • {p.beds} bds • {p.baths} ba</div>
              </div>

              <div className="inq-meta-row">
                <div>
                  <div className="inq-agent">Agent: {p.agent || 'Agent Name'}</div>
                  <div className="inq-address">{p.location}</div>
                  <div className="inq-subrow">
                    <span className={`inq-pill pill-${p.status.toLowerCase()}`}>{p.status}</span>
                    <span className="inq-time-inline">{p.time}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="inq-action">
              <div className={`inq-status-dot ${p.status === 'REPLIED' ? 'online' : ''}`} />
              <div className="inq-action-link">{p.status === 'REPLIED' ? <a>View Chat <i className="fa-solid fa-angle-right"/></a> : <a>Details <i className="fa-solid fa-angle-right"/></a>}</div>
            </div>
          </article>
        ))}
      </main>

      <footer className="inq-bottom-nav">
        <button>SEARCH</button>
        <button>SAVED</button>
        <button className="active">INQUIRIES</button>
        <button>MY RENT</button>
        <button>MORE</button>
      </footer>
    </div>
  )
}
