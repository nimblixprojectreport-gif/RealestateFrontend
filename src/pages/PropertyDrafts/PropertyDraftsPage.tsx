import React from 'react'
import './PropertyDraftsPage.css'
import { listings } from '../../data/LandingPage/listings'

type Draft = {
  id: string
  title: string
  lastEdited?: string
  completion: number
  image?: string
}

// derive draft-like entries from landing page listings (use first n items)
const drafts: Draft[] = listings.slice(0, 6).map((l) => ({
  id: String(l.id),
  title: l.location || l.details || `Property ${l.id}`,
  lastEdited: undefined,
  // deterministic completion percentage so UI looks varied
  completion: ((l.id * 13) % 80) + 5,
  image: (l as any).image,
}))

export const PropertyDraftsPage: React.FC = () => {
  return (
    <div className="pd-page-root">
      <header className="pd-topbar">
        <button className="pd-back">←</button>
        <h1>Property Drafts</h1>
      </header>

      <main className="pd-content">
        <section className="pd-section-title">
          <h2>Incomplete Listings</h2>
          <p>Finish these listings to reach more buyers.</p>
        </section>

        <div className="pd-list">
          {drafts.map((d) => (
            <article className="pd-card" key={d.id}>
              <div className="pd-card-top">
                <div className="pd-thumb">
                  {d.image ? (
                    // listing images are module imports so they resolve correctly
                    <img src={d.image} alt={d.title} />
                  ) : (
                    <div className="pd-thumb-placeholder">+</div>
                  )}
                </div>
                <div className="pd-meta">
                  <div className="pd-title">{d.title}</div>
                  <div className="pd-sub">{d.lastEdited ? `Last edited: ${d.lastEdited}` : 'Started: Just now'}</div>
                </div>
              </div>

              <div className="pd-completion-row">
                <div className="pd-completion-label">Completion</div>
                <div className="pd-completion-percent">{d.completion}%</div>
              </div>

              <div className="pd-progress">
                <div className="pd-progress-bar">
                  <div
                    className="pd-progress-fill"
                    style={{ width: `${d.completion}%` }}
                  />
                </div>
              </div>

              <div className="pd-actions">
                <button className="pd-continue">Continue Editing</button>
                <button className="pd-delete">🗑️</button>
              </div>
            </article>
          ))}
        </div>
      </main>

      <nav className="pd-bottom-nav">
        <button>Explore</button>
        <button className="active">Drafts</button>
        <button>Messages</button>
        <button>Profile</button>
      </nav>
    </div>
  )
}

export default PropertyDraftsPage
