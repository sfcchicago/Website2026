import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Broadcast,
  Church,
  User,
  Clock,
  Users,
  BookOpen,
  Article,
  CheckCircle,
  WarningCircle,
  ArrowSquareOut,
  FloppyDisk,
  LockKey,
  SignOut,
  Plus,
  Trash,
} from "@phosphor-icons/react";
import { useSiteData } from "../context/SiteContext";

const TABS = [
  { id: "settings", label: "Live & Links", icon: Broadcast },
  { id: "pastor", label: "Our Pastor", icon: User },
  { id: "services", label: "Services", icon: Clock },
  { id: "leadership", label: "Leadership", icon: Users },
  { id: "beliefs", label: "Beliefs", icon: BookOpen },
  { id: "about", label: "Mission & Story", icon: Article },
];

export default function Manager() {
  const siteData = useSiteData();
  const [activeTab, setActiveTab] = useState("settings");
  const [adminKey, setAdminKey] = useState(() => localStorage.getItem("sfc_admin_key") || "");
  const [isUnlocked, setIsUnlocked] = useState(() => Boolean(localStorage.getItem("sfc_admin_key")));
  const [loginErr, setLoginErr] = useState("");

  // Local form state cloned from context
  const [settingsForm, setSettingsForm] = useState(siteData.settings);
  const [pastorForm, setPastorForm] = useState(siteData.pastor);
  const [servicesForm, setServicesForm] = useState(siteData.services);
  const [leadershipForm, setLeadershipForm] = useState(siteData.leadership);
  const [beliefsForm, setBeliefsForm] = useState(siteData.beliefs);
  const [aboutForm, setAboutForm] = useState(siteData.about);

  const [saving, setSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState(null);

  useEffect(() => {
    setSettingsForm(siteData.settings);
    setPastorForm(siteData.pastor);
    setServicesForm(siteData.services);
    setLeadershipForm(siteData.leadership);
    setBeliefsForm(siteData.beliefs);
    setAboutForm(siteData.about);
  }, [siteData]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (adminKey.trim() === "sfc2026") {
      localStorage.setItem("sfc_admin_key", adminKey.trim());
      setIsUnlocked(true);
      setLoginErr("");
    } else {
      setLoginErr("Incorrect admin passcode. Try 'sfc2026'");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("sfc_admin_key");
    setIsUnlocked(false);
  };

  const handleSave = async (collectionName, dataToSave) => {
    setSaving(true);
    setSaveStatus(null);
    const startTime = performance.now();
    try {
      await siteData.saveLiveCollection(collectionName, dataToSave, adminKey || "sfc2026");
      const elapsed = Math.round(performance.now() - startTime);
      setSaveStatus({
        type: "success",
        msg: `Published to live website in ${elapsed}ms! No build needed.`,
      });
      setTimeout(() => setSaveStatus(null), 6000);
    } catch (err) {
      setSaveStatus({
        type: "error",
        msg: err.message || "Failed to publish changes.",
      });
    } finally {
      setSaving(false);
    }
  };

  if (!isUnlocked) {
    return (
      <div style={styles.authContainer}>
        <div style={styles.authCard}>
          <div style={{ textAlign: "center", marginBottom: 24 }}>
            <div style={styles.authIconWrap}>
              <LockKey size={32} weight="duotone" color="#2563eb" />
            </div>
            <h2 style={{ fontSize: 22, fontWeight: 700, margin: "12px 0 4px" }}>
              Sharon Fellowship Church
            </h2>
            <p style={{ color: "#64748b", fontSize: 14 }}>
              Enter administrator passcode to manage live content
            </p>
          </div>

          <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div>
              <label style={styles.label}>Admin Passcode</label>
              <input
                type="password"
                placeholder="Enter passcode (sfc2026)"
                value={adminKey}
                onChange={(e) => setAdminKey(e.target.value)}
                style={styles.input}
                autoFocus
              />
            </div>

            {loginErr && <div style={styles.errorBanner}>{loginErr}</div>}

            <button type="submit" style={styles.primaryBtn}>
              Unlock Manager
            </button>
          </form>
          <div style={{ textAlign: "center", marginTop: 20 }}>
            <Link to="/" style={{ fontSize: 13, color: "#64748b", textDecoration: "none" }}>
              ← Return to public website
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.pageWrap}>
      {/* Header bar */}
      <header style={styles.topHeader}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={styles.statusDot} />
          <div>
            <h1 style={styles.topTitle}>Instant Website Manager</h1>
            <span style={styles.topSubtitle}>
              Live Cloud Publishing (<span style={{ color: "#16a34a" }}>0-second sync</span>)
            </span>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <Link to="/" target="_blank" style={styles.viewSiteBtn}>
            <span>View Website</span>
            <ArrowSquareOut size={16} weight="bold" />
          </Link>
          <button onClick={handleLogout} style={styles.logoutBtn} title="Lock session">
            <SignOut size={16} weight="bold" />
          </button>
        </div>
      </header>

      {/* Main layout */}
      <div style={styles.contentLayout}>
        {/* Navigation Sidebar */}
        <aside style={styles.sidebar}>
          <nav style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setSaveStatus(null);
                  }}
                  style={{
                    ...styles.tabBtn,
                    ...(isActive ? styles.tabBtnActive : {}),
                  }}
                >
                  <Icon size={18} weight={isActive ? "fill" : "regular"} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Editor Area */}
        <main style={styles.editorArea}>
          {saveStatus && (
            <div
              style={{
                ...styles.banner,
                ...(saveStatus.type === "success" ? styles.successBanner : styles.errorBanner),
              }}
            >
              {saveStatus.type === "success" ? (
                <CheckCircle size={20} weight="fill" />
              ) : (
                <WarningCircle size={20} weight="fill" />
              )}
              <span>{saveStatus.msg}</span>
            </div>
          )}

          {/* TAB 1: Live & Links */}
          {activeTab === "settings" && (
            <div style={styles.card}>
              <div style={styles.cardHead}>
                <div>
                  <h2 style={styles.cardTitle}>Live Stream, Giving & General Links</h2>
                  <p style={styles.cardDesc}>
                    Update Sunday YouTube stream link, online giving, and contact info.
                  </p>
                </div>
                <button
                  onClick={() => handleSave("settings", settingsForm)}
                  disabled={saving}
                  style={styles.saveBtn}
                >
                  <FloppyDisk size={18} weight="bold" />
                  <span>{saving ? "Publishing..." : "Publish Instantly"}</span>
                </button>
              </div>

              <div style={styles.formGrid}>
                <div style={styles.fullWidth}>
                  <label style={styles.label}>
                    🔴 YouTube Watch Live URL (Updates Nav & Buttons Instantly)
                  </label>
                  <input
                    type="text"
                    style={{ ...styles.input, borderColor: "#ef4444", fontWeight: 600 }}
                    value={settingsForm?.liveUrl || ""}
                    onChange={(e) =>
                      setSettingsForm((prev) => ({ ...prev, liveUrl: e.target.value }))
                    }
                    placeholder="https://youtube.com/live/..."
                  />
                  <span style={styles.helperText}>
                    Paste the active YouTube live link every Sunday morning. Takes effect on the site immediately.
                  </span>
                </div>

                <div>
                  <label style={styles.label}>Online Giving (Venmo) URL</label>
                  <input
                    type="text"
                    style={styles.input}
                    value={settingsForm?.giveUrl || ""}
                    onChange={(e) =>
                      setSettingsForm((prev) => ({ ...prev, giveUrl: e.target.value }))
                    }
                  />
                </div>

                <div>
                  <label style={styles.label}>Events / Announcements URL</label>
                  <input
                    type="text"
                    style={styles.input}
                    value={settingsForm?.eventsUrl || ""}
                    onChange={(e) =>
                      setSettingsForm((prev) => ({ ...prev, eventsUrl: e.target.value }))
                    }
                  />
                </div>

                <div style={styles.fullWidth}>
                  <label style={styles.label}>Church Tagline</label>
                  <input
                    type="text"
                    style={styles.input}
                    value={settingsForm?.tagline || ""}
                    onChange={(e) =>
                      setSettingsForm((prev) => ({ ...prev, tagline: e.target.value }))
                    }
                  />
                </div>

                <div>
                  <label style={styles.label}>Phone Number</label>
                  <input
                    type="text"
                    style={styles.input}
                    value={settingsForm?.phone || ""}
                    onChange={(e) =>
                      setSettingsForm((prev) => ({ ...prev, phone: e.target.value }))
                    }
                  />
                </div>

                <div>
                  <label style={styles.label}>Email Address</label>
                  <input
                    type="text"
                    style={styles.input}
                    value={settingsForm?.email || ""}
                    onChange={(e) =>
                      setSettingsForm((prev) => ({ ...prev, email: e.target.value }))
                    }
                  />
                </div>

                <div style={styles.fullWidth}>
                  <label style={styles.label}>Physical Address</label>
                  <input
                    type="text"
                    style={styles.input}
                    value={settingsForm?.address || ""}
                    onChange={(e) =>
                      setSettingsForm((prev) => ({ ...prev, address: e.target.value }))
                    }
                  />
                </div>

                <div style={styles.fullWidth}>
                  <label style={styles.label}>Year Theme Verse (English)</label>
                  <textarea
                    rows={2}
                    style={styles.textarea}
                    value={settingsForm?.verseText || ""}
                    onChange={(e) =>
                      setSettingsForm((prev) => ({ ...prev, verseText: e.target.value }))
                    }
                  />
                </div>

                <div>
                  <label style={styles.label}>Verse Reference</label>
                  <input
                    type="text"
                    style={styles.input}
                    value={settingsForm?.verseRef || ""}
                    onChange={(e) =>
                      setSettingsForm((prev) => ({ ...prev, verseRef: e.target.value }))
                    }
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Our Pastor */}
          {activeTab === "pastor" && (
            <div style={styles.card}>
              <div style={styles.cardHead}>
                <div>
                  <h2 style={styles.cardTitle}>Pastor Profile & Headshot Framing</h2>
                  <p style={styles.cardDesc}>
                    Edit Pastor name, tenure, bio paragraphs, and adjust photo zoom and position.
                  </p>
                </div>
                <button
                  onClick={() => handleSave("pastor", pastorForm)}
                  disabled={saving}
                  style={styles.saveBtn}
                >
                  <FloppyDisk size={18} weight="bold" />
                  <span>{saving ? "Publishing..." : "Publish Instantly"}</span>
                </button>
              </div>

              <div style={styles.formGrid}>
                <div>
                  <label style={styles.label}>Pastor Name</label>
                  <input
                    type="text"
                    style={styles.input}
                    value={pastorForm?.name || ""}
                    onChange={(e) =>
                      setPastorForm((prev) => ({ ...prev, name: e.target.value }))
                    }
                  />
                </div>

                <div>
                  <label style={styles.label}>Role / Title</label>
                  <input
                    type="text"
                    style={styles.input}
                    value={pastorForm?.role || ""}
                    onChange={(e) =>
                      setPastorForm((prev) => ({ ...prev, role: e.target.value }))
                    }
                  />
                </div>

                <div>
                  <label style={styles.label}>Tenure / Years</label>
                  <input
                    type="text"
                    style={styles.input}
                    value={pastorForm?.since || ""}
                    onChange={(e) =>
                      setPastorForm((prev) => ({ ...prev, since: e.target.value }))
                    }
                  />
                </div>

                <div>
                  <label style={styles.label}>Location</label>
                  <input
                    type="text"
                    style={styles.input}
                    value={pastorForm?.location || ""}
                    onChange={(e) =>
                      setPastorForm((prev) => ({ ...prev, location: e.target.value }))
                    }
                  />
                </div>

                <div style={styles.fullWidth}>
                  <label style={styles.label}>Photo URL</label>
                  <input
                    type="text"
                    style={styles.input}
                    value={pastorForm?.photo || ""}
                    onChange={(e) =>
                      setPastorForm((prev) => ({ ...prev, photo: e.target.value }))
                    }
                  />
                </div>

                <div>
                  <label style={styles.label}>Photo Framing / Focus</label>
                  <select
                    style={styles.select}
                    value={pastorForm?.photoPosition || "center 20%"}
                    onChange={(e) =>
                      setPastorForm((prev) => ({ ...prev, photoPosition: e.target.value }))
                    }
                  >
                    <option value="center 20%">Face / Upper Center (Recommended)</option>
                    <option value="center top">Top (Head / Hair)</option>
                    <option value="center center">Dead Center</option>
                    <option value="center bottom">Lower / Body</option>
                  </select>
                </div>

                <div>
                  <label style={styles.label}>Photo Zoom / Scale</label>
                  <select
                    style={styles.select}
                    value={pastorForm?.photoScale || "1.0"}
                    onChange={(e) =>
                      setPastorForm((prev) => ({ ...prev, photoScale: e.target.value }))
                    }
                  >
                    <option value="1.0">100% (Normal)</option>
                    <option value="1.1">110% (Slight Zoom)</option>
                    <option value="1.2">120% (Medium Zoom)</option>
                    <option value="1.35">135% (Close Up)</option>
                    <option value="0.9">90% (Fit Wider)</option>
                  </select>
                </div>

                <div style={styles.fullWidth}>
                  <label style={styles.label}>Biography Paragraphs (one per line)</label>
                  <textarea
                    rows={6}
                    style={styles.textarea}
                    value={
                      Array.isArray(pastorForm?.bio)
                        ? pastorForm.bio.join("\n\n")
                        : pastorForm?.bio || ""
                    }
                    onChange={(e) =>
                      setPastorForm((prev) => ({
                        ...prev,
                        bio: e.target.value.split("\n\n").filter(Boolean),
                      }))
                    }
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: Services */}
          {activeTab === "services" && (
            <div style={styles.card}>
              <div style={styles.cardHead}>
                <div>
                  <h2 style={styles.cardTitle}>Weekly Services & Gatherings</h2>
                  <p style={styles.cardDesc}>
                    Configure Sunday Malayalam & English services, Sunday School, and prayer times.
                  </p>
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                  <button
                    onClick={() =>
                      setServicesForm((prev) => [
                        ...prev,
                        { name: "New Service", day: "Sunday", time: "10:00 AM", note: "" },
                      ])
                    }
                    style={styles.secondaryBtn}
                  >
                    <Plus size={16} weight="bold" />
                    <span>Add Service</span>
                  </button>
                  <button
                    onClick={() => handleSave("services", servicesForm)}
                    disabled={saving}
                    style={styles.saveBtn}
                  >
                    <FloppyDisk size={18} weight="bold" />
                    <span>{saving ? "Publishing..." : "Publish Instantly"}</span>
                  </button>
                </div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {(servicesForm || []).map((service, idx) => (
                  <div key={idx} style={styles.itemBox}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontWeight: 600, fontSize: 15 }}>#{idx + 1} {service.name}</span>
                      <button
                        onClick={() =>
                          setServicesForm((prev) => prev.filter((_, i) => i !== idx))
                        }
                        style={styles.delBtn}
                        title="Delete service"
                      >
                        <Trash size={16} />
                      </button>
                    </div>

                    <div style={styles.formGrid}>
                      <div>
                        <label style={styles.label}>Service Name</label>
                        <input
                          type="text"
                          style={styles.input}
                          value={service.name}
                          onChange={(e) => {
                            const val = e.target.value;
                            setServicesForm((prev) =>
                              prev.map((s, i) => (i === idx ? { ...s, name: val } : s))
                            );
                          }}
                        />
                      </div>
                      <div>
                        <label style={styles.label}>Day of Week</label>
                        <input
                          type="text"
                          style={styles.input}
                          value={service.day}
                          onChange={(e) => {
                            const val = e.target.value;
                            setServicesForm((prev) =>
                              prev.map((s, i) => (i === idx ? { ...s, day: val } : s))
                            );
                          }}
                        />
                      </div>
                      <div>
                        <label style={styles.label}>Time</label>
                        <input
                          type="text"
                          style={styles.input}
                          value={service.time}
                          onChange={(e) => {
                            const val = e.target.value;
                            setServicesForm((prev) =>
                              prev.map((s, i) => (i === idx ? { ...s, time: val } : s))
                            );
                          }}
                        />
                      </div>
                      <div>
                        <label style={styles.label}>Description / Note</label>
                        <input
                          type="text"
                          style={styles.input}
                          value={service.note || ""}
                          onChange={(e) => {
                            const val = e.target.value;
                            setServicesForm((prev) =>
                              prev.map((s, i) => (i === idx ? { ...s, note: val } : s))
                            );
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: Leadership */}
          {activeTab === "leadership" && (
            <div style={styles.card}>
              <div style={styles.cardHead}>
                <div>
                  <h2 style={styles.cardTitle}>Board & Leadership Teams</h2>
                  <p style={styles.cardDesc}>
                    Manage Board of Directors, Ministerial Coordinators, and Sunday School Teachers.
                  </p>
                </div>
                <button
                  onClick={() => handleSave("leadership", leadershipForm)}
                  disabled={saving}
                  style={styles.saveBtn}
                >
                  <FloppyDisk size={18} weight="bold" />
                  <span>{saving ? "Publishing..." : "Publish Instantly"}</span>
                </button>
              </div>

              {/* Board Members */}
              <div style={{ marginBottom: 32 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                  <h3 style={{ fontSize: 16, fontWeight: 700 }}>Board of Directors</h3>
                  <button
                    onClick={() =>
                      setLeadershipForm((prev) => ({
                        ...prev,
                        board: [...(prev.board || []), { name: "New Member", role: "Board Member", photo: "" }],
                      }))
                    }
                    style={styles.secondaryBtn}
                  >
                    <Plus size={14} /> Add Board Member
                  </button>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {(leadershipForm?.board || []).map((m, idx) => (
                    <div key={idx} style={styles.personRow}>
                      <input
                        type="text"
                        placeholder="Full Name"
                        style={{ ...styles.input, flex: 2 }}
                        value={m.name}
                        onChange={(e) => {
                          const val = e.target.value;
                          setLeadershipForm((prev) => ({
                            ...prev,
                            board: prev.board.map((item, i) =>
                              i === idx ? { ...item, name: val } : item
                            ),
                          }));
                        }}
                      />
                      <input
                        type="text"
                        placeholder="Role / Title"
                        style={{ ...styles.input, flex: 2 }}
                        value={m.role}
                        onChange={(e) => {
                          const val = e.target.value;
                          setLeadershipForm((prev) => ({
                            ...prev,
                            board: prev.board.map((item, i) =>
                              i === idx ? { ...item, role: val } : item
                            ),
                          }));
                        }}
                      />
                      <input
                        type="text"
                        placeholder="Photo URL (/people/...)"
                        style={{ ...styles.input, flex: 3 }}
                        value={m.photo || ""}
                        onChange={(e) => {
                          const val = e.target.value;
                          setLeadershipForm((prev) => ({
                            ...prev,
                            board: prev.board.map((item, i) =>
                              i === idx ? { ...item, photo: val } : item
                            ),
                          }));
                        }}
                      />
                      <button
                        onClick={() =>
                          setLeadershipForm((prev) => ({
                            ...prev,
                            board: prev.board.filter((_, i) => i !== idx),
                          }))
                        }
                        style={styles.delBtn}
                      >
                        <Trash size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Ministerial Coordinators */}
              <div style={{ marginBottom: 32 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                  <h3 style={{ fontSize: 16, fontWeight: 700 }}>Ministerial Support</h3>
                  <button
                    onClick={() =>
                      setLeadershipForm((prev) => ({
                        ...prev,
                        ministerialSupport: [
                          ...(prev.ministerialSupport || []),
                          { name: "New Coordinator", role: "Coordinator", photo: "" },
                        ],
                      }))
                    }
                    style={styles.secondaryBtn}
                  >
                    <Plus size={14} /> Add Coordinator
                  </button>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {(leadershipForm?.ministerialSupport || []).map((m, idx) => (
                    <div key={idx} style={styles.personRow}>
                      <input
                        type="text"
                        placeholder="Full Name"
                        style={{ ...styles.input, flex: 2 }}
                        value={m.name}
                        onChange={(e) => {
                          const val = e.target.value;
                          setLeadershipForm((prev) => ({
                            ...prev,
                            ministerialSupport: prev.ministerialSupport.map((item, i) =>
                              i === idx ? { ...item, name: val } : item
                            ),
                          }));
                        }}
                      />
                      <input
                        type="text"
                        placeholder="Role / Title"
                        style={{ ...styles.input, flex: 2 }}
                        value={m.role}
                        onChange={(e) => {
                          const val = e.target.value;
                          setLeadershipForm((prev) => ({
                            ...prev,
                            ministerialSupport: prev.ministerialSupport.map((item, i) =>
                              i === idx ? { ...item, role: val } : item
                            ),
                          }));
                        }}
                      />
                      <input
                        type="text"
                        placeholder="Photo URL (/people/...)"
                        style={{ ...styles.input, flex: 3 }}
                        value={m.photo || ""}
                        onChange={(e) => {
                          const val = e.target.value;
                          setLeadershipForm((prev) => ({
                            ...prev,
                            ministerialSupport: prev.ministerialSupport.map((item, i) =>
                              i === idx ? { ...item, photo: val } : item
                            ),
                          }));
                        }}
                      />
                      <button
                        onClick={() =>
                          setLeadershipForm((prev) => ({
                            ...prev,
                            ministerialSupport: prev.ministerialSupport.filter((_, i) => i !== idx),
                          }))
                        }
                        style={styles.delBtn}
                      >
                        <Trash size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: Beliefs */}
          {activeTab === "beliefs" && (
            <div style={styles.card}>
              <div style={styles.cardHead}>
                <div>
                  <h2 style={styles.cardTitle}>Core Beliefs</h2>
                  <p style={styles.cardDesc}>
                    Update foundational doctrinal statements displayed on What We Believe.
                  </p>
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                  <button
                    onClick={() =>
                      setBeliefsForm((prev) => [
                        ...prev,
                        { title: "New Belief", body: "Description of belief." },
                      ])
                    }
                    style={styles.secondaryBtn}
                  >
                    <Plus size={16} />
                    <span>Add Belief</span>
                  </button>
                  <button
                    onClick={() => handleSave("beliefs", beliefsForm)}
                    disabled={saving}
                    style={styles.saveBtn}
                  >
                    <FloppyDisk size={18} weight="bold" />
                    <span>{saving ? "Publishing..." : "Publish Instantly"}</span>
                  </button>
                </div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {(beliefsForm || []).map((b, idx) => (
                  <div key={idx} style={styles.itemBox}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                      <span style={{ fontWeight: 600, fontSize: 15 }}>#{idx + 1}</span>
                      <button
                        onClick={() => setBeliefsForm((prev) => prev.filter((_, i) => i !== idx))}
                        style={styles.delBtn}
                      >
                        <Trash size={16} />
                      </button>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                      <input
                        type="text"
                        style={styles.input}
                        value={b.title}
                        onChange={(e) => {
                          const val = e.target.value;
                          setBeliefsForm((prev) =>
                            prev.map((item, i) => (i === idx ? { ...item, title: val } : item))
                          );
                        }}
                      />
                      <textarea
                        rows={3}
                        style={styles.textarea}
                        value={b.body}
                        onChange={(e) => {
                          const val = e.target.value;
                          setBeliefsForm((prev) =>
                            prev.map((item, i) => (i === idx ? { ...item, body: val } : item))
                          );
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: Mission & Story */}
          {activeTab === "about" && (
            <div style={styles.card}>
              <div style={styles.cardHead}>
                <div>
                  <h2 style={styles.cardTitle}>Mission Statement & History</h2>
                  <p style={styles.cardDesc}>
                    Edit the church mission, vision points, and founding story.
                  </p>
                </div>
                <button
                  onClick={() => handleSave("about", aboutForm)}
                  disabled={saving}
                  style={styles.saveBtn}
                >
                  <FloppyDisk size={18} weight="bold" />
                  <span>{saving ? "Publishing..." : "Publish Instantly"}</span>
                </button>
              </div>

              <div style={styles.formGrid}>
                <div style={styles.fullWidth}>
                  <label style={styles.label}>Mission Statement</label>
                  <textarea
                    rows={3}
                    style={styles.textarea}
                    value={aboutForm?.mission || ""}
                    onChange={(e) =>
                      setAboutForm((prev) => ({ ...prev, mission: e.target.value }))
                    }
                  />
                </div>

                <div style={styles.fullWidth}>
                  <label style={styles.label}>Church History & Journey</label>
                  <textarea
                    rows={5}
                    style={styles.textarea}
                    value={aboutForm?.history || ""}
                    onChange={(e) =>
                      setAboutForm((prev) => ({ ...prev, history: e.target.value }))
                    }
                  />
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

const styles = {
  pageWrap: {
    minHeight: "100vh",
    backgroundColor: "#f8fafc",
    fontFamily: "var(--font-body, system-ui, -apple-system, sans-serif)",
    color: "#0f172a",
  },
  topHeader: {
    backgroundColor: "#ffffff",
    borderBottom: "1px solid #e2e8f0",
    padding: "16px 32px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    position: "sticky",
    top: 0,
    zIndex: 10,
  },
  statusDot: {
    width: 10,
    height: 10,
    borderRadius: "50%",
    backgroundColor: "#16a34a",
    boxShadow: "0 0 0 4px rgba(22, 163, 74, 0.15)",
  },
  topTitle: {
    fontSize: 18,
    fontWeight: 700,
    margin: 0,
    letterSpacing: "-0.01em",
  },
  topSubtitle: {
    fontSize: 12,
    color: "#64748b",
  },
  viewSiteBtn: {
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    padding: "8px 14px",
    borderRadius: 8,
    border: "1px solid #e2e8f0",
    backgroundColor: "#ffffff",
    color: "#0f172a",
    fontSize: 13,
    fontWeight: 600,
    textDecoration: "none",
  },
  logoutBtn: {
    padding: "8px 12px",
    borderRadius: 8,
    border: "1px solid #e2e8f0",
    backgroundColor: "#ffffff",
    color: "#64748b",
    cursor: "pointer",
  },
  contentLayout: {
    display: "flex",
    maxWidth: 1300,
    margin: "0 auto",
    padding: "32px 24px",
    gap: 32,
  },
  sidebar: {
    width: 220,
    flexShrink: 0,
  },
  tabBtn: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    padding: "12px 16px",
    borderRadius: 8,
    border: "none",
    backgroundColor: "transparent",
    color: "#64748b",
    fontSize: 14,
    fontWeight: 500,
    cursor: "pointer",
    textAlign: "left",
    transition: "all 0.15s ease",
  },
  tabBtnActive: {
    backgroundColor: "#ffffff",
    color: "#0f172a",
    fontWeight: 700,
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(0, 0, 0, 0.03)",
  },
  editorArea: {
    flex: 1,
    minWidth: 0,
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 28,
    border: "1px solid #e2e8f0",
    boxShadow: "0 1px 3px rgba(0,0,0,0.02)",
  },
  cardHead: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    borderBottom: "1px solid #f1f5f9",
    paddingBottom: 20,
    marginBottom: 24,
    gap: 16,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 700,
    margin: 0,
    color: "#0f172a",
  },
  cardDesc: {
    fontSize: 13,
    color: "#64748b",
    margin: "4px 0 0",
  },
  saveBtn: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    padding: "10px 20px",
    backgroundColor: "#0284c7",
    color: "#ffffff",
    border: "none",
    borderRadius: 8,
    fontWeight: 600,
    fontSize: 14,
    cursor: "pointer",
    boxShadow: "0 2px 6px rgba(2, 132, 199, 0.25)",
  },
  secondaryBtn: {
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    padding: "8px 14px",
    backgroundColor: "#f1f5f9",
    color: "#0f172a",
    border: "1px solid #e2e8f0",
    borderRadius: 8,
    fontSize: 13,
    fontWeight: 600,
    cursor: "pointer",
  },
  formGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 18,
  },
  fullWidth: {
    gridColumn: "1 / -1",
  },
  label: {
    display: "block",
    fontSize: 13,
    fontWeight: 600,
    color: "#334155",
    marginBottom: 6,
  },
  input: {
    width: "100%",
    boxSizing: "border-box",
    padding: "10px 14px",
    borderRadius: 8,
    border: "1px solid #cbd5e1",
    fontSize: 14,
    color: "#0f172a",
    backgroundColor: "#ffffff",
  },
  select: {
    width: "100%",
    boxSizing: "border-box",
    padding: "10px 14px",
    borderRadius: 8,
    border: "1px solid #cbd5e1",
    fontSize: 14,
    color: "#0f172a",
    backgroundColor: "#ffffff",
  },
  textarea: {
    width: "100%",
    boxSizing: "border-box",
    padding: "10px 14px",
    borderRadius: 8,
    border: "1px solid #cbd5e1",
    fontSize: 14,
    color: "#0f172a",
    backgroundColor: "#ffffff",
    fontFamily: "inherit",
    lineHeight: 1.5,
  },
  helperText: {
    display: "block",
    fontSize: 12,
    color: "#64748b",
    marginTop: 4,
  },
  itemBox: {
    padding: 16,
    border: "1px solid #e2e8f0",
    borderRadius: 8,
    backgroundColor: "#fafbfc",
  },
  personRow: {
    display: "flex",
    gap: 12,
    alignItems: "center",
  },
  delBtn: {
    padding: "8px 10px",
    backgroundColor: "#fee2e2",
    color: "#ef4444",
    border: "none",
    borderRadius: 6,
    cursor: "pointer",
  },
  banner: {
    padding: "12px 16px",
    borderRadius: 8,
    marginBottom: 20,
    display: "flex",
    alignItems: "center",
    gap: 10,
    fontSize: 14,
    fontWeight: 500,
  },
  successBanner: {
    backgroundColor: "#dcfce7",
    color: "#15803d",
    border: "1px solid #bbf7d0",
  },
  errorBanner: {
    backgroundColor: "#fee2e2",
    color: "#b91c1c",
    border: "1px solid #fecaca",
  },
  authContainer: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f1f5f9",
    padding: 24,
  },
  authCard: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 36,
    width: "100%",
    maxWidth: 420,
    boxShadow: "0 10px 25px -5px rgba(0,0,0,0.05), 0 8px 10px -6px rgba(0,0,0,0.01)",
    border: "1px solid #e2e8f0",
  },
  authIconWrap: {
    width: 56,
    height: 56,
    borderRadius: "50%",
    backgroundColor: "#eff6ff",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
  },
  primaryBtn: {
    width: "100%",
    padding: "12px 16px",
    backgroundColor: "#0284c7",
    color: "#ffffff",
    border: "none",
    borderRadius: 8,
    fontSize: 14,
    fontWeight: 600,
    cursor: "pointer",
  },
};
