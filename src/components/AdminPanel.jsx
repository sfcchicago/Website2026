import React, { useState } from 'react';
import siteSettings from '../content/settings.json';

export default function AdminPanel() {
  const [settings, setSettings] = useState(siteSettings);
  const [status, setStatus] = useState('');
  const [saving, setSaving] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSettings(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setStatus('Saving...');
    try {
      const res = await fetch('/api/save-settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings, null, 2),
      });
      if (res.ok) {
        setStatus('✅ Settings saved! Website updated.');
      } else {
        setStatus('❌ Failed to save.');
      }
    } catch (err) {
      setStatus('❌ Error: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div style={{
      maxWidth: '700px',
      margin: '60px auto',
      padding: '32px',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      backgroundColor: '#ffffff',
      borderRadius: '12px',
      boxShadow: '0 4px 25px rgba(0,0,0,0.1)',
      color: '#1e293b'
    }}>
      <div style={{ borderBottom: '1px solid #e2e8f0', paddingBottom: '16px', marginBottom: '24px' }}>
        <h1 style={{ fontSize: '24px', margin: 0, color: '#0f172a' }}>Church Website Manager</h1>
        <p style={{ margin: '4px 0 0', color: '#64748b', fontSize: '14px' }}>
          Volunteers can update links, service times, and buttons here.
        </p>
      </div>

      {status && (
        <div style={{
          padding: '12px 16px',
          borderRadius: '8px',
          marginBottom: '20px',
          backgroundColor: status.includes('✅') ? '#ecfdf5' : '#fef2f2',
          color: status.includes('✅') ? '#065f46' : '#991b1b',
          fontSize: '14px',
          fontWeight: 600
        }}>
          {status}
        </div>
      )}

      <form onSubmit={handleSave}>
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, marginBottom: '6px' }}>
            🔴 Watch Live Stream Link (YouTube)
          </label>
          <input
            type="text"
            name="liveUrl"
            value={settings.liveUrl || ''}
            onChange={handleChange}
            style={{ width: '100%', padding: '10px 14px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '14px', boxSizing: 'border-box' }}
            placeholder="https://youtube.com/live/..."
          />
          <small style={{ display: 'block', color: '#64748b', marginTop: '4px', fontSize: '12px' }}>
            Updates the "Watch Live" button on the navigation bar and hero.
          </small>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, marginBottom: '6px' }}>
            Church Phone Number
          </label>
          <input
            type="text"
            name="phone"
            value={settings.phone || ''}
            onChange={handleChange}
            style={{ width: '100%', padding: '10px 14px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '14px', boxSizing: 'border-box' }}
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, marginBottom: '6px' }}>
            Church Email
          </label>
          <input
            type="email"
            name="email"
            value={settings.email || ''}
            onChange={handleChange}
            style={{ width: '100%', padding: '10px 14px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '14px', boxSizing: 'border-box' }}
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, marginBottom: '6px' }}>
            Church Address
          </label>
          <input
            type="text"
            name="address"
            value={settings.address || ''}
            onChange={handleChange}
            style={{ width: '100%', padding: '10px 14px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '14px', boxSizing: 'border-box' }}
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, marginBottom: '6px' }}>
            Giving Link (Venmo)
          </label>
          <input
            type="text"
            name="giveUrl"
            value={settings.giveUrl || ''}
            onChange={handleChange}
            style={{ width: '100%', padding: '10px 14px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '14px', boxSizing: 'border-box' }}
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, marginBottom: '6px' }}>
            Featured Bible Verse
          </label>
          <textarea
            name="verseText"
            rows="3"
            value={settings.verseText || ''}
            onChange={handleChange}
            style={{ width: '100%', padding: '10px 14px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '14px', boxSizing: 'border-box' }}
          />
        </div>

        <div style={{ marginBottom: '28px' }}>
          <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, marginBottom: '6px' }}>
            Verse Reference
          </label>
          <input
            type="text"
            name="verseRef"
            value={settings.verseRef || ''}
            onChange={handleChange}
            style={{ width: '100%', padding: '10px 14px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '14px', boxSizing: 'border-box' }}
          />
        </div>

        <button
          type="submit"
          disabled={saving}
          style={{
            backgroundColor: '#2563eb',
            color: '#ffffff',
            padding: '12px 24px',
            border: 'none',
            borderRadius: '6px',
            fontWeight: 600,
            fontSize: '15px',
            cursor: 'pointer'
          }}
        >
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </form>
    </div>
  );
}
