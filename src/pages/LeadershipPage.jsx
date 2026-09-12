import PageHeader from "../components/PageHeader";
import { Reveal } from "../components/Reveal";
import PersonCard from "../components/PersonCard";
import initialLeadership from "../content/leadership.json";
import { useTina } from "tinacms/dist/react";
import { LeadershipDocument } from "../../tina/__generated__/types";

const leadershipInitial = {
  __typename: "Leadership",
  ...initialLeadership,
  _sys: {
    filename: "leadership",
    basename: "leadership.json",
    breadcrumbs: ["leadership"],
    path: "src/content/leadership.json",
    relativePath: "leadership.json",
    extension: "json",
  },
  id: "src/content/leadership.json",
};

export default function Leadership() {
  const { data } = useTina({
    query: LeadershipDocument,
    variables: { relativePath: "leadership.json" },
    data: { leadership: leadershipInitial },
  });

  const leadership = data?.leadership || initialLeadership;
  const board = leadership?.board || initialLeadership.board || [];
  const ministerialSupport = leadership?.ministerialSupport || initialLeadership.ministerialSupport || [];

  return (
    <>
      <PageHeader
        eyebrow="Leadership"
        title="Servant leadership."
        lead="The people who steward the vision, worship, hospitality, and ministry of our church every week."
        className="leadership-header"
      />

      <section>
        <div className="container">
          <Reveal>
            <div className="section-head">
              <span className="badge"><span className="badge-dot" /> Board of Directors</span>
              <h2 className="section-title">Guiding the <em>vision</em></h2>
              <p className="section-subtitle">The Board stewards the vision, finances, and direction of the church.</p>
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
              <span className="badge"><span className="badge-dot" /> Ministerial Support</span>
              <h2 className="section-title">The hands and <em>feet</em></h2>
              <p className="section-subtitle">Coordinators who keep worship, hospitality, media, and ministry moving every week.</p>
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
