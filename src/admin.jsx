import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import siteSettings from '../content/settings.json';

function AdminApp() {
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
        setStatus('✅ Settings saved successfully! Website updated.');
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
      margin: '40px auto',
      padding: '30px',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      backgroundColor: '#ffffff',
      borderRadius: '12px',
      boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
      color: '#1e293b'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #e2e8f0', paddingBottom: '20px', marginBottom: '24px' }}>
        <div>
          <h1 style={{ fontSize: '24px', margin: 0, color: '#0f172a' }}>Church Website Admin</h1>
          <p style={{ margin: '4px 0 0', color: '#64748b', fontSize: '14px' }}>Edit website buttons, links, and content directly.</p>
        </div>
        <a href="/" style={{ fontSize: '14px', color: '#2563eb', textDecoration: 'none', fontWeight: 500 }}>← View Website</a>
      </div>

      {status && (
        <div style={{
          padding: '12px 16px',
          borderRadius: '8px',
          marginBottom: '20px',
          backgroundColor: status.includes('✅') ? '#ecfdf5' : '#fef2f2',
          color: status.includes('✅') ? '#065f46' : '#991b1b',
          fontSize: '14px',
          fontWeight: 500
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
            This controls the "Watch Live" button in the top navigation and banner.
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
            Venmo Giving Link
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
            cursor: 'pointer',
            boxShadow: '0 2px 4px rgba(37,99,235,0.2)'
          }}
        >
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </form>
    </div>
  );
}

const root = createRoot(document.getElementById('root'));
root.render(<AdminApp />);
