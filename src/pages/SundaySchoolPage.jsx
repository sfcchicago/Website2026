import PageHeader from "../components/PageHeader";
import { Reveal } from "../components/Reveal";
import PersonCard from "../components/PersonCard";
import { sundaySchool } from "../data";

export default function SundaySchool() {
  return (
    <>
      <PageHeader
        eyebrow="Sunday School"
        title="Raising the next generation."
        lead="Every Sunday at 10:00 AM, kids and teens dive into God's Word in age-based classes, from toddlers to senior high."
      />

      <section>
        <div className="container">
          <Reveal>
            <div className="ss-banner">
              <div>
                <span className="badge" style={{ marginBottom: 6 }}>Sunday School</span>
                <h3>10:00 – 10:55 AM</h3>
              </div>
              <div style={{ textAlign: "right" }}>
                <p>Every Sunday, all ages</p>
                <span className="ss-banner-time">Age-based classes</span>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="section-head" style={{ marginTop: 24 }}>
              <span className="badge"><span className="badge-dot" /> Teaching Staff</span>
              <h2 className="section-title">Meet the <em>teachers</em></h2>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="people-grid">
              {sundaySchool.map((p) => (
                <PersonCard key={p.name} person={p} />
              ))}
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
