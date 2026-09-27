import { useState } from "react";
import { Link } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import { Reveal } from "../components/Reveal";
import initialBeliefs from "../content/beliefs.json";
import { useSiteData } from "../context/SiteContext";
import { CaretDown, BookOpenText, CheckCircle, ArrowRight } from "@phosphor-icons/react";

const fullStatementTopics = [
  "Water Baptism",
  "The Lord's Supper",
  "Baptism in the Holy Spirit",
  "Divine Healing",
  "The New Heaven & New Earth",
];

export default function Beliefs() {
  const { beliefs, beliefsDoc } = useSiteData();
  const beliefsList = beliefs?.length ? beliefs : initialBeliefs.items;

  const headerEyebrow = beliefsDoc?.headerEyebrow || "What We Believe";
  const headerTitle = beliefsDoc?.headerTitle || "Anchored in the Word.";
  const headerLead = beliefsDoc?.headerLead || "Anchored in the 66 books of the Bible, joyfully Pentecostal, and centered on Jesus.";

  const cardEyebrow = beliefsDoc?.statementCardEyebrow || "Full Statement of Faith";
  const cardTitle = beliefsDoc?.statementCardTitle || "A Deeper Look at What We Hold True";
  const cardDesc = beliefsDoc?.statementCardDescription || "Our church confession stands firmly on the whole counsel of Scripture. In addition to our foundational tenets above, our complete statement of faith articulates our biblical convictions on:";
  const cardTopics = beliefsDoc?.statementTopics?.length ? beliefsDoc.statementTopics : fullStatementTopics;
  const cardNote = beliefsDoc?.statementNote || "Our complete, detailed statement of faith document is gladly available upon request.";
  const cardCta = beliefsDoc?.statementCtaText || "Request Full Statement";

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
        eyebrow={headerEyebrow}
        title={headerTitle}
        lead={headerLead}
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
                      <h3>{b.title}</h3>
                      <span className="belief-caret">
                        <CaretDown size={16} weight="bold" />
                      </span>
                    </button>
                    <div className="belief-body">
                      <div>
                        <p>{b.body}</p>
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
                    <span className="statement-eyebrow">{cardEyebrow}</span>
                    <h3 className="statement-title">{cardTitle}</h3>
                  </div>
                </div>

                <p className="statement-desc">
                  {cardDesc}
                </p>

                <ul className="statement-topics" aria-label="Key doctrinal topics">
                  {cardTopics.map((topic) => (
                    <li key={topic} className="statement-pill">
                      <CheckCircle size={15} weight="fill" className="pill-check" />
                      <span>{topic}</span>
                    </li>
                  ))}
                </ul>

                <div className="statement-footer">
                  <p className="statement-note-text">
                    {cardNote}
                  </p>
                  <Link to="/contact" className="btn btn-primary btn-sm statement-cta">
                    <span>{cardCta}</span>
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
