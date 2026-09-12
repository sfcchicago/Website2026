import { useState } from "react";
import { Link } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import { Reveal } from "../components/Reveal";
import initialBeliefs from "../content/beliefs.json";
import { useTina, tinaField } from "tinacms/dist/react";
import { BeliefsDocument } from "../../tina/__generated__/types";
import { CaretDown, BookOpenText, CheckCircle, ArrowRight } from "@phosphor-icons/react";
import { useSiteData } from "../context/SiteContext";

const fullStatementTopics = [
  "Water Baptism",
  "The Lord's Supper",
  "Baptism in the Holy Spirit",
  "Divine Healing",
  "The New Heaven & New Earth",
];

const beliefsInitial = {
  ...initialBeliefs,
  _sys: {
    filename: "beliefs",
    basename: "beliefs.json",
    breadcrumbs: ["beliefs"],
    path: "src/content/beliefs.json",
    relativePath: "beliefs.json",
    extension: "json",
  },
  id: "src/content/beliefs.json",
};

export default function Beliefs() {
  const { beliefs: liveBeliefs } = useSiteData();
  const initialData = liveBeliefs ? { ...beliefsInitial, items: liveBeliefs } : beliefsInitial;
  const { data } = useTina({
    query: BeliefsDocument,
    variables: { relativePath: "beliefs.json" },
    data: { beliefs: initialData },
  });

  const beliefsData = data?.beliefs || initialData;
  const beliefsList = beliefsData?.items || liveBeliefs || initialBeliefs.items || [];

  // Allow multiple beliefs to be open independently
  const [openIndices, setOpenIndices] = useState(() => new Set());

  const toggleIndex = (i) => {
    setOpenIndices((prev) => {
      const next = new Set(prev);
      if (next.has(i)) {
        next.delete(i);
      } else {
        next.add(i);
      }
      return next;
    });
  };

  return (
    <>
      <PageHeader
        eyebrow="What We Believe"
        title="Anchored in the Word."
        lead="Anchored in the 66 books of the Bible, joyfully Pentecostal, and centered on Jesus."
      />

      <section className="beliefs-section">
        <div className="container">
          <div className="beliefs-container">
            <Reveal>
              <div className="beliefs-list">
                {beliefsList.map((b, i) => (
                  <div
                    key={b.title}
                    className={`belief-item${openIndices.has(i) ? " is-open" : ""}`}
                  >
                    <button className="belief-q" onClick={() => toggleIndex(i)}>
                      <span className="belief-num">{String(i + 1).padStart(2, "0")}</span>
                      <h3 data-tina-field={tinaField(b, "title")}>{b.title}</h3>
                      <span className="belief-caret">
                        <CaretDown size={16} weight="bold" />
                      </span>
                    </button>
                    <div className="belief-body">
                      <div>
                        <p data-tina-field={tinaField(b, "body")}>{b.body}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>

            {/* Redesigned Full Statement of Faith Card */}
            <Reveal delay={0.1}>
              <div className="belief-statement-card">
                <div className="statement-header">
                  <div className="statement-icon">
                    <BookOpenText size={24} weight="duotone" />
                  </div>
                  <div className="statement-titles">
                    <span className="statement-eyebrow">Full Statement of Faith</span>
                    <h3 className="statement-title">A Deeper Look at What We Hold True</h3>
                  </div>
                </div>

                <p className="statement-desc">
                  Our church confession stands firmly on the whole counsel of Scripture. In addition to our foundational tenets above, our complete statement of faith articulates our biblical convictions on:
                </p>

                <ul className="statement-topics" aria-label="Key doctrinal topics">
                  {fullStatementTopics.map((topic) => (
                    <li key={topic} className="statement-pill">
                      <CheckCircle size={15} weight="fill" className="pill-check" />
                      <span>{topic}</span>
                    </li>
                  ))}
                </ul>

                <div className="statement-footer">
                  <p className="statement-note-text">
                    Our complete, detailed statement of faith document is gladly available upon request.
                  </p>
                  <Link to="/contact" className="btn btn-primary btn-sm statement-cta">
                    <span>Request Full Statement</span>
                    <span className="btn-ico">
                      <ArrowRight size={14} weight="bold" />
                    </span>
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}

