import { useState, useEffect } from "react";
import PageHeader from "../components/PageHeader";
import { Reveal, SectionHead } from "../components/Reveal";
import { pastor as defaultPastor, pastorHistory as defaultPastorHistory, REMOTE_UP } from "../data";
import { useSiteData } from "../context/SiteContext";
import { isImageReady, preloadImage } from "../utils/preload";
import { Church, MapPin, GraduationCap, Heart } from "@phosphor-icons/react";
import { motion } from "framer-motion";

function TlAvatar({ person }) {
  const [imgErr, setImgErr] = useState(false);
  const [src, setSrc] = useState(person?.photo || "");
  const [isLoaded, setIsLoaded] = useState(() => isImageReady(person?.photo || ""));

  useEffect(() => {
    setSrc(person?.photo || "");
    setImgErr(false);
    if (person?.photo && !isImageReady(person.photo)) {
      preloadImage(person.photo).then(() => setIsLoaded(true));
    } else {
      setIsLoaded(true);
    }
  }, [person?.photo]);

  const initials = (person?.name || "Pastor")
    .replace(/^Rev\.?\s*/i, "")
    .split(" ")
    .filter(Boolean)
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const handleError = () => {
    if (src && src.startsWith("/people") && REMOTE_UP) {
      setSrc(src.replace("/people", REMOTE_UP));
    } else {
      setImgErr(true);
    }
  };

  return (
    <div className="tl-avatar">
      <span className="initials" aria-hidden="true">{initials}</span>
      {src && !imgErr && (
        <img
          src={src}
          alt={person?.name || "Pastor"}
          loading="lazy"
          decoding="async"
          onLoad={() => setIsLoaded(true)}
          onError={handleError}
          className={isLoaded ? "is-loaded" : "is-loading"}
          style={{
            "--photo-position": person?.photoPosition || "center 20%",
            "--photo-scale": person?.photoScale ? String(person.photoScale) : "1",
          }}
        />
      )}
    </div>
  );
}

export default function Pastor() {
  const { pastor: sitePastor, pastorHistory: siteHistory, urlFor } = useSiteData();
  const currentPastor = sitePastor || defaultPastor;
  const historyList = siteHistory && siteHistory.length > 0 ? siteHistory : defaultPastorHistory;

  const rawPhoto = currentPastor?.photo || defaultPastor?.photo || "/people/pastor.jpg";
  const photoUrl = (urlFor && typeof rawPhoto === "object" ? urlFor(rawPhoto) : null) || (typeof rawPhoto === "string" ? rawPhoto : "") || "/people/pastor.jpg";
  const [src, setSrc] = useState(photoUrl);
  const [imgErr, setImgErr] = useState(false);
  const [isLoaded, setIsLoaded] = useState(() => isImageReady(photoUrl));

  useEffect(() => {
    const nextRaw = currentPastor?.photo || defaultPastor?.photo || "/people/pastor.jpg";
    const nextPhoto = (urlFor && typeof nextRaw === "object" ? urlFor(nextRaw) : null) || (typeof nextRaw === "string" ? nextRaw : "") || "/people/pastor.jpg";
    setSrc(nextPhoto);
    setImgErr(false);
  }, [currentPastor?.photo, urlFor]);

  useEffect(() => {
    if (src && !isImageReady(src)) {
      preloadImage(src).then(() => setIsLoaded(true));
    } else {
      setIsLoaded(true);
    }
  }, [src]);

  const handleError = () => {
    if (src && src.startsWith("/people") && REMOTE_UP) {
      setSrc(src.replace("/people", REMOTE_UP));
    } else if (src !== "/people/pastor.jpg") {
      setSrc("/people/pastor.jpg");
    } else {
      setImgErr(true);
    }
  };

  const initials = (currentPastor?.name || "Pastor")
    .replace(/^Rev\.?\s*/i, "")
    .split(" ")
    .filter(Boolean)
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const rawBio = currentPastor?.bio && currentPastor.bio.length > 0 ? currentPastor.bio : defaultPastor.bio;
  const bioArray = Array.isArray(rawBio)
    ? rawBio
    : typeof rawBio === "string"
    ? rawBio.split(/\n\s*\n/).filter(Boolean)
    : [rawBio].filter(Boolean);
  const [lead = "Born into a lifelong heritage of faith and ministry...", ...rest] = bioArray.length > 0 ? bioArray : ["Born into a lifelong heritage of faith and ministry..."];

  const defaultQuote = "To walk with this flock is a sacred calling—anchored in the Word, grounded in prayer, and devoted to seeing every generation flourish in Christ.";
  const pillsList = currentPastor?.pills?.length
    ? currentPastor.pills
    : [
        currentPastor?.location || "Chicago, Illinois",
        "Mini & M. G. Johnson",
        "M.Th • UBS & Gurukul Scholar",
        "50-Yr Pastoral Heritage",
      ];

  return (
    <>
      <PageHeader
        eyebrow={currentPastor?.headerEyebrow || "Our Pastor"}
        title={currentPastor?.headerTitle || "Shepherd of this house."}
        lead={currentPastor?.headerLead || "A faithful servant called to preach the uncompromised Word of God, love the flock, and build the body of Christ."}
        className="pastor-header"
      />

      <section className="pastor-section">
        <div className="container pastor-page-container">
          {/* 1. TITLE: Header block above image with role, since badge, name, subhead */}
          <Reveal>
            <div className="pastor-header-block">
              <div className="pastor-badge-row">
                <span className="badge">
                  <span className="badge-dot" /> {currentPastor?.role || "Senior Pastor"}
                </span>
                <span className="badge-mono">{currentPastor?.since || "Serving since 2025"}</span>
              </div>
              <h1 className="pastor-heading">{currentPastor?.name || "Rev. M. G. Johnson"}</h1>
              <p className="pastor-subhead">
                Faithful shepherd of Sharon Fellowship Church &bull; {currentPastor?.location || "Chicago, Illinois"}
              </p>
            </div>
          </Reveal>

          {/* 2. PHOTO: Landscape aspect ratio */}
          <Reveal delay={0.06}>
            <div
              className="pastor-photo-wrap"
              data-person-name={currentPastor?.name || "Rev. M. G. Johnson"}
            >
              <div className="pastor-photo pastor-photo-landscape">
                <span className="pastor-placeholder" aria-hidden="true">{initials}</span>
                {src && !imgErr && (
                  <img
                    src={src}
                    alt={`${currentPastor?.name || "Rev. M. G. Johnson"} and Sis. Mini Johnson`}
                    loading="eager"
                    decoding="async"
                    onLoad={() => setIsLoaded(true)}
                    onError={handleError}
                    className={isLoaded ? "is-loaded" : "is-loading"}
                    style={{
                      "--photo-position": currentPastor?.photoPosition || "center 22%",
                      "--photo-scale": currentPastor?.photoScale ? String(currentPastor.photoScale) : "1",
                    }}
                  />
                )}
                <div className="pastor-photo-tag">
                  <span>{currentPastor?.name || "Rev. M. G. Johnson"} &amp; Sis. Mini Johnson</span>
                </div>
              </div>
            </div>
          </Reveal>

          {/* 3. GLASSMORPHIC CARD: Neatly sitting below the photo */}
          <Reveal delay={0.1}>
            <div className="pastor-aesthetic-card pastor-card-stacked">
              <div className="card-ambient-glow" aria-hidden="true" />

              <div className="aesthetic-card-top">
                <div className="aesthetic-card-badge">
                  <span className="aesthetic-dot" />
                  <span>A Heart for the Flock</span>
                </div>
                <span className="aesthetic-year">{currentPastor?.since || "Serving since 2025"}</span>
              </div>

              <blockquote className="aesthetic-quote">
                &ldquo;{currentPastor?.quote || defaultQuote}&rdquo;
              </blockquote>

              <div className="aesthetic-card-bottom">
                <div className="aesthetic-divider" />

                <div className="aesthetic-pills-row">
                  {pillsList.map((pill, i) => (
                    <motion.span
                      key={pill || i}
                      className="aesthetic-pill"
                      whileHover={{ y: -2, scale: 1.03 }}
                      transition={{ type: "spring", stiffness: 450, damping: 20 }}
                    >
                      {i === 0 ? <MapPin weight="duotone" /> : i === 1 ? <Heart weight="duotone" /> : i === 2 ? <GraduationCap weight="duotone" /> : <Church weight="duotone" />} {pill}
                    </motion.span>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>

          {/* 4. TEXT: Bio lead & paragraphs below the glassmorphic card */}
          <Reveal delay={0.14}>
            <div className="pastor-bio-body">
              <p className="pastor-lead">
                <strong>{lead}</strong>
              </p>
              {rest.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section>
        <div className="container">
          <Reveal>
            <SectionHead
              center
              eyebrow={currentPastor?.historyEyebrow || "Our History"}
              title={currentPastor?.historyTitle || <>Shepherds who have <em>led us well</em></>}
              lead={currentPastor?.historyLead || "From a living room in 1999 to our own building in 2004, six pastors have carried this flock."}
            />
          </Reveal>

          <Reveal delay={0.1}>
            <div className="history-timeline">
              {historyList.map((p) => (
                <div
                  className={`tl-item${p.years && p.years.includes("Present") ? " is-current" : ""}`}
                  key={p.name}
                >
                  <TlAvatar person={p} />
                  <div className="tl-text">
                    <span className="tl-years">{p.years}</span>
                    <span className="tl-name">{p.name}</span>
                    {p.years && p.years.includes("Present") && <span className="tl-now">Present</span>}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.14}>
            <div className="pastor-verse">
              <p>&ldquo;{currentPastor?.pastoralVerseText || "Watch over the flock of God that is among you, shepherding them by the will of God."}&rdquo;</p>
              <span>{currentPastor?.pastoralVerseRef || "1 Peter 5:2"}</span>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
