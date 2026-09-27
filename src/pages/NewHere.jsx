import { useState } from "react";
import { Reveal } from "../components/Reveal";
import { mission as defaultMission } from "../data";
import { useSiteData } from "../context/SiteContext";
import { House, Church, GlobeHemisphereWest, Lightning, HandHeart, Heart } from "@phosphor-icons/react";
import { motion } from "framer-motion";

const DEFAULT_JOURNEY_STEPS = [
  {
    year: "1999",
    title: "A humble beginning",
    text: "First service in a living room, led by the late Rev. P. C. Oommen.",
    icon: House
  },
  {
    year: "2004",
    title: "A place to call home",
    text: "God opened the door to our home on 67th Street in Kenosha.",
    icon: Church
  },
  {
    year: "Today",
    title: "A growing family",
    text: "A family of believers, worshiping in Malayalam and English every Sunday.",
    icon: GlobeHemisphereWest
  }
];

export default function NewHere() {
  const { about, homeContent } = useSiteData();
  const [activeYear, setActiveYear] = useState(0);

  const missionData = about || defaultMission;
  const rawJourney = about?.journey && about.journey.length > 0 ? about.journey : DEFAULT_JOURNEY_STEPS;
  const journeySteps = rawJourney.map((j, idx) => ({
    year: j.year,
    title: j.title || (idx === 0 ? "A humble beginning" : idx === 1 ? "A place to call home" : "A growing family"),
    text: j.text,
    icon: idx === 0 ? House : idx === 1 ? Church : GlobeHemisphereWest,
  }));

  const stats = homeContent?.stats?.length ? homeContent.stats : [
    { number: "1999", label: "Founded in Illinois" },
    { number: "100+", label: "Members & growing" },
    { number: "22", label: "Years in Kenosha" },
    { number: "2", label: "Languages each Sunday" },
  ];

  const heroEyebrow = about?.heroEyebrow || "I'm New Here";
  const heroTitle = about?.heroTitle || "Welcome home. We saved you a seat.";
  const heroLead = about?.heroLead || "Whether you are exploring faith for the first time or looking for a church to call home, you belong here.";
  const storyEyebrow = about?.storyEyebrow || "Our story";
  const storyTitle = about?.storyTitle || "From a living room to a family of believers.";
  const journeyEyebrow = about?.journeyEyebrow || "History";
  const journeyTitle = about?.journeyTitle || "Our Journey";
  const journeySubtitle = about?.journeySubtitle || "From a humble living room to a growing family of believers spanning decades.";
  const visionEyebrow = about?.visionEyebrow || "Our Vision";
  const visionTitle = about?.visionTitle || "To provide a hope and a future.";
  const visionLead = about?.visionLead || "We are driven by our commitment to four core pillars that guide everything we do as a church family.";

  return (
    <div className="new-here-page">
      <section className="new-here-hero">
        <div className="container">
          <div className="new-here-hero-grid">
            <div className="new-here-welcome-col">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.26, ease: [0.16, 1, 0.3, 1] }}
              >
                <motion.span
                  className="badge"
                  style={{ marginBottom: 14 }}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                >
                  <span className="badge-dot" /> {heroEyebrow}
                </motion.span>
                <motion.h1
                  className="page-title new-here-title"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.04, duration: 0.26, ease: [0.16, 1, 0.3, 1] }}
                >
                  {heroTitle.includes(".") ? (
                    <>
                      {heroTitle.split(".")[0]}.<br />
                      <em>{heroTitle.split(".").slice(1).join(".").trim()}</em>
                    </>
                  ) : (
                    heroTitle
                  )}
                </motion.h1>
                <motion.p
                  className="page-lead new-here-lead"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08, duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
                >
                  {heroLead}
                </motion.p>
              </motion.div>
            </div>

            <div className="new-here-story-col">
              <Reveal delay={0.12}>
                <div className="new-here-story-content">
                  <span className="badge" style={{ marginBottom: 14 }}>
                    <span className="badge-dot" /> {storyEyebrow}
                  </span>
                  <h2 className="section-title new-here-story-title">
                    {storyTitle}
                  </h2>
                  <div className="story-body new-here-story-body">
                    <p style={{ marginBottom: 14 }}>{missionData.mission}</p>
                    <p>{missionData.history}</p>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <section style={{ paddingTop: 0, paddingBottom: 10 }}>
        <div className="container" style={{ maxWidth: 1100 }}>
          <Reveal>
            <div className="aesthetic-stats">
              {stats.map((s, idx) => (
                <div className="a-stat-col" key={idx}>
                  <span className="a-stat-value">{s.number}</span>
                  <span className="a-stat-text">{s.label}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="aesthetic-journey-section" style={{ paddingTop: 36, paddingBottom: 24 }}>
        <div className="container" style={{ maxWidth: 1100 }}>
          <div className="a-journey-layout">
            <div className="a-journey-left">
              <Reveal>
                <div className="a-journey-left-content">
                  <div className="a-journey-badge-wrap">
                    <span className="badge">
                      <span className="badge-dot" /> {journeyEyebrow}
                    </span>
                  </div>
                  <h3 className="section-title" style={{ margin: 0, fontSize: "clamp(28px, 3.6vw, 40px)", letterSpacing: "-0.03em" }}>
                    {journeyTitle}
                  </h3>
                  <p className="page-lead" style={{ fontSize: "clamp(14.5px, 1.25vw, 16px)", marginTop: 10, marginBottom: 20, color: "var(--muted)", lineHeight: 1.55 }}>
                    {journeySubtitle}
                  </p>
                  <div className="a-journey-dates-list">
                    {journeySteps.map((step, idx) => (
                      <a 
                        key={step.year} 
                        href={`#journey-${step.year}`}
                        className={`a-journey-date-link ${activeYear === idx ? "active" : ""}`}
                        onClick={(e) => {
                          e.preventDefault();
                          document.getElementById(`journey-${step.year}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        }}
                      >
                        <span className="a-journey-date-dot">
                          <span className="a-journey-dot-core" />
                        </span>
                        <div className="a-journey-date-info">
                          <span className="a-journey-date-text">{step.year}</span>
                          <span className="a-journey-date-sub">{step.title}</span>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>
            <div className="a-journey-right">
              {journeySteps.map((step, idx) => {
                const Icon = step.icon;
                return (
                  <motion.div
                    id={`journey-${step.year}`}
                    key={step.year}
                    className="a-journey-card"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    style={{ position: "relative" }}
                  >
                    <motion.div
                      onViewportEnter={() => setActiveYear(idx)}
                      viewport={{ amount: "some", margin: "-40% 0px -40% 0px" }}
                      style={{ position: "absolute", top: 0, bottom: 0, left: 0, width: 1 }}
                    />
                    <div className="a-j-icon-wrap">
                      <Icon weight="duotone" size={18} />
                    </div>
                    <div className="a-j-content-wrap">
                      <span className="a-j-year">{step.year}</span>
                      <h4 className="a-j-title">{step.title}</h4>
                      <p className="a-j-text">{step.text}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="vision-section" style={{ padding: "clamp(80px, 10vw, 120px) 0", background: "var(--surface)", borderTop: "1px solid var(--line)", overflow: "hidden" }}>
        <div className="container">
          <div className="vision-layout">
            <div className="vision-left">
              <Reveal>
                <span className="badge" style={{ marginBottom: 20 }}>
                  <span className="badge-dot" /> {visionEyebrow}
                </span>
                <h2 className="section-title" style={{ fontSize: "clamp(36px, 4.5vw, 56px)", marginBottom: 24, lineHeight: 1.1 }}>
                  {visionTitle}
                </h2>
                <p className="section-lead" style={{ fontSize: "clamp(16px, 1.5vw, 18px)", color: "var(--muted)", lineHeight: 1.6, maxWidth: 440 }}>
                  {visionLead}
                </p>
              </Reveal>
            </div>
            
            <div className="vision-right">
              {(missionData.vision || []).map((v, i) => {
                const icons = [
                  <Lightning key="lightning" weight="duotone" size={26} />,
                  <GlobeHemisphereWest key="globe" weight="duotone" size={26} />,
                  <HandHeart key="handheart" weight="duotone" size={26} />,
                  <Heart key="heart" weight="duotone" size={26} />
                ];
                
                return (
                  <Reveal key={i} delay={0.1 + (i * 0.1)} x={30}>
                    <div className="vision-list-item">
                      <div className="vision-number">
                        0{i + 1}
                      </div>
                      <div className="vision-icon" style={{
                        background: "var(--surface)",
                        color: "var(--accent-light)",
                        border: "1px solid var(--glass-brd)"
                      }}>
                        {icons[i]}
                      </div>
                      <h4>
                        {v}
                      </h4>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
