import PageHeader from "../components/PageHeader";
import { Reveal } from "../components/Reveal";
import PersonCard from "../components/PersonCard";
import initialLeadership from "../content/leadership.json";
import { useSiteData } from "../context/SiteContext";

export default function Leadership() {
  const { leadership } = useSiteData();
  const currentLeadership = leadership || initialLeadership;
  const board = currentLeadership?.board?.length ? currentLeadership.board : initialLeadership.board;
  const ministerialSupport = currentLeadership?.ministerialSupport?.length
    ? currentLeadership.ministerialSupport
    : initialLeadership.ministerialSupport;

  const headerEyebrow = currentLeadership?.headerEyebrow || "Leadership";
  const headerTitle = currentLeadership?.headerTitle || "Servant leadership.";
  const headerLead = currentLeadership?.headerLead || "The people who steward the vision, worship, hospitality, and ministry of our church every week.";

  const boardSectionEyebrow = currentLeadership?.boardSectionEyebrow || "Board of Directors";
  const boardSectionTitle = currentLeadership?.boardSectionTitle || "Guiding the vision";
  const boardSectionSubtitle = currentLeadership?.boardSectionSubtitle || "The Board stewards the vision, finances, and direction of the church.";

  const ministerialSectionEyebrow = currentLeadership?.ministerialSectionEyebrow || "Ministerial Support";
  const ministerialSectionTitle = currentLeadership?.ministerialSectionTitle || "The hands and feet";
  const ministerialSectionSubtitle = currentLeadership?.ministerialSectionSubtitle || "Coordinators who keep worship, hospitality, media, and ministry moving every week.";

  return (
    <>
      <PageHeader
        eyebrow={headerEyebrow}
        title={headerTitle}
        lead={headerLead}
        className="leadership-header"
      />

      <section>
        <div className="container">
          <Reveal>
            <div className="section-head">
              <span className="badge"><span className="badge-dot" /> {boardSectionEyebrow}</span>
              <h2 className="section-title">{boardSectionTitle}</h2>
              <p className="section-subtitle">{boardSectionSubtitle}</p>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="people-grid">
              {board.map((p) => (
                <PersonCard key={p.name} person={p} />
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section>
        <div className="container">
          <Reveal>
            <div className="section-head">
              <span className="badge"><span className="badge-dot" /> {ministerialSectionEyebrow}</span>
              <h2 className="section-title">{ministerialSectionTitle}</h2>
              <p className="section-subtitle">{ministerialSectionSubtitle}</p>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="people-grid">
              {ministerialSupport.map((p) => (
                <PersonCard key={p.name} person={p} />
              ))}
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
