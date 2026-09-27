import PageHeader from "../components/PageHeader";
import { Reveal } from "../components/Reveal";
import PersonCard from "../components/PersonCard";
import { sundaySchool as defaultSundaySchool } from "../data";
import { useSiteData } from "../context/SiteContext";

export default function SundaySchool() {
  const { sundaySchool, sundaySchoolInfo, leadership } = useSiteData();
  const teachers = sundaySchool?.length ? sundaySchool : (leadership?.sundaySchool || defaultSundaySchool);

  const headerEyebrow = sundaySchoolInfo?.headerEyebrow || "Sunday School";
  const headerTitle = sundaySchoolInfo?.headerTitle || "Raising the next generation.";
  const headerLead = sundaySchoolInfo?.headerLead || "Every Sunday at 10:00 AM, kids and teens dive into God's Word in age-based classes, from toddlers to senior high.";

  const bannerBadge = sundaySchoolInfo?.bannerBadge || "Sunday School";
  const bannerTime = sundaySchoolInfo?.bannerTime || "10:00 – 10:55 AM";
  const bannerSub = sundaySchoolInfo?.bannerSub || "Every Sunday, all ages";
  const bannerTag = sundaySchoolInfo?.bannerTag || "Age-based classes";

  const teachersSectionEyebrow = sundaySchoolInfo?.teachersSectionEyebrow || "Teaching Staff";
  const teachersSectionTitle = sundaySchoolInfo?.teachersSectionTitle || "Meet the teachers";

  return (
    <>
      <PageHeader
        eyebrow={headerEyebrow}
        title={headerTitle}
        lead={headerLead}
      />

      <section>
        <div className="container">
          <Reveal>
            <div className="ss-banner">
              <div>
                <span className="badge" style={{ marginBottom: 6 }}>{bannerBadge}</span>
                <h3>{bannerTime}</h3>
              </div>
              <div style={{ textAlign: "right" }}>
                <p>{bannerSub}</p>
                <span className="ss-banner-time">{bannerTag}</span>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="section-head" style={{ marginTop: 24 }}>
              <span className="badge"><span className="badge-dot" /> {teachersSectionEyebrow}</span>
              <h2 className="section-title">{teachersSectionTitle}</h2>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="people-grid">
              {teachers.map((p) => (
                <PersonCard key={p.name} person={p} />
              ))}
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
