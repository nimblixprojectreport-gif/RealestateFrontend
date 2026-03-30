import React, { useState } from 'react'
import './ProfileSettingsPage.css'

export default function ProfileSettingsPage() {
  const [fullName, setFullName] = useState('Sharukh Khan')
  const [email, setEmail] = useState('sharukh.khan@example.com')
  const [phone, setPhone] = useState('+91 98765 43210')
  const [currentPassword, setCurrentPassword] = useState('')
  const [pushNotifications, setPushNotifications] = useState(false)

  function handleSave(e: React.FormEvent) {
    e.preventDefault()
    // placeholder: wire up API save
    alert('Saved (stub)')
  }

  return (
    <div className="profile-settings-page page">
      <header className="ps-header">
        <div className="ps-avatar">{fullName.split(' ').map(n => n[0]).join('')}</div>
        <div className="ps-meta">
          <h1>{fullName}</h1>
          <div className="ps-sub">Real Estate Enthusiast • San Francisco</div>
          <button className="btn-update">Update Profile Photo</button>
        </div>
      </header>

      <form className="ps-form" onSubmit={handleSave}>
        <section className="ps-section">
          <h2>Personal Information</h2>
          <label>
            Full Name
            <input value={fullName} onChange={e => setFullName(e.target.value)} />
          </label>
          <label>
            Email Address
            <input value={email} onChange={e => setEmail(e.target.value)} />
          </label>
          <label>
            Phone Number
            <input value={phone} onChange={e => setPhone(e.target.value)} />
          </label>
        </section>

        <section className="ps-section">
          <h2>Account Security</h2>
          <label>
            Current Password
            <input type="password" value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} />
          </label>
          <div className="ps-change-password">Change Password</div>
        </section>

        <section className="ps-section">
          <h2>Notification Preferences</h2>
          <div className="ps-toggle-row">
            <div>
              <div className="ps-toggle-label">Push Notifications</div>
              <div className="ps-toggle-sub">Instant alerts for new matching properties</div>
            </div>
            <label className="switch">
              <input type="checkbox" checked={pushNotifications} onChange={e => setPushNotifications(e.target.checked)} />
              <span className="slider" />
            </label>
          </div>
        </section>

        <div className="ps-actions">
          <button type="submit" className="btn-save">Save All Changes</button>
          <button type="button" className="btn-signout">Sign Out</button>
        </div>
      </form>
    </div>
  )
}
