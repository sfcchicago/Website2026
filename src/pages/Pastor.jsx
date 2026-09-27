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
  const [src, setSrc] = useState(person.photo);
  const [isLoaded, setIsLoaded] = useState(() => isImageReady(person.photo));

  useEffect(() => {
    if (person.photo && !isImageReady(person.photo)) {
      preloadImage(person.photo).then(() => setIsLoaded(true));
    }
  }, [person.photo]);

  const initials = person.name
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
          alt={person.name}
          loading="lazy"
          decoding="async"
          onLoad={() => setIsLoaded(true)}
          onError={handleError}
          className={isLoaded ? "is-loaded" : "is-loading"}
          style={{
            "--photo-position": person.photoPosition || "center 20%",
            "--photo-scale": person.photoScale ? String(person.photoScale) : "1",
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

  const photoUrl = urlFor(currentPastor.photo) || currentPastor.photo;
  const [src, setSrc] = useState(photoUrl);
  const [imgErr, setImgErr] = useState(false);
  const [isLoaded, setIsLoaded] = useState(() => isImageReady(photoUrl));

  useEffect(() => {
    const nextPhoto = urlFor(currentPastor.photo) || currentPastor.photo;
    setSrc(nextPhoto);
  }, [currentPastor.photo, urlFor]);

  useEffect(() => {
    if (src && !isImageReady(src)) {
      preloadImage(src).then(() => setIsLoaded(true));
    }
  }, [src]);

  const handleError = () => {
    if (src && src.startsWith("/people") && REMOTE_UP) {
      setSrc(src.replace("/people", REMOTE_UP));
    } else {
      setImgErr(true);
    }
  };

  const bioArray = Array.isArray(currentPastor.bio) ? currentPastor.bio : [currentPastor.bio].filter(Boolean);
  const [lead, ...rest] = bioArray.length > 0 ? bioArray : ["Born into a lifelong heritage of faith and ministry..."];

  return (
    <>
      <PageHeader
        eyebrow="Our Pastor"
        title="Shepherd of this house."
        lead="A faithful servant called to preach the uncompromised Word of God, love the flock, and build the body of Christ."
        className="pastor-header"
      />

      <section>
        <div className="container">
          <div className="pastor-grid">
            <Reveal className="pastor-photo-col">
              <div className="pastor-photo-frame">
                <div className="photo-corner photo-corner-tl" />
                <div className="photo-corner photo-corner-br" />
                <div className="photo-ambient" aria-hidden="true" />

                <div className="pastor-photo-img-wrap">
                  {!isLoaded && !imgErr && (
                    <div className="pastor-photo-shimmer" aria-hidden="true" />
                  )}
                  {src && !imgErr ? (
                    <img
                      src={src}
                      alt={currentPastor.name}
                      loading="eager"
                      decoding="async"
                      onLoad={() => setIsLoaded(true)}
                      onError={handleError}
                      className={isLoaded ? "is-loaded" : "is-loading"}
                    />
                  ) : (
                    <div className="pastor-photo-fallback">
                      <Church size={64} weight="duotone" />
                    </div>
                  )}
                </div>
              </div>

              <div className="pastor-aesthetic-card">
                <div className="card-ambient-glow" aria-hidden="true" />

                <div className="aesthetic-card-top">
                  <div className="aesthetic-card-badge">
                    <span className="aesthetic-dot" />
                    <span>A Heart for the Flock</span>
                  </div>
                  <span className="aesthetic-year">{currentPastor.since}</span>
                </div>

                <blockquote className="aesthetic-quote">
                  &ldquo;To walk with this flock is a sacred calling&mdash;anchored in the Word, grounded in prayer, and devoted to seeing every generation flourish in Christ.&rdquo;
                </blockquote>

                <div className="aesthetic-card-bottom">
                  <div className="aesthetic-divider" />

                  <div className="aesthetic-pills-row">
                    <motion.span
                      className="aesthetic-pill"
                      whileHover={{ y: -2, scale: 1.03 }}
                      transition={{ type: "spring", stiffness: 450, damping: 20 }}
                    >
                      <MapPin weight="duotone" /> {currentPastor.location}
                    </motion.span>
                    <motion.span
                      className="aesthetic-pill"
                      whileHover={{ y: -2, scale: 1.03 }}
                      transition={{ type: "spring", stiffness: 450, damping: 20 }}
                    >
                      <Heart weight="duotone" /> Mini &amp; M. G. Johnson
                    </motion.span>
                    <motion.span
                      className="aesthetic-pill"
                      whileHover={{ y: -2, scale: 1.03 }}
                      transition={{ type: "spring", stiffness: 450, damping: 20 }}
                    >
                      <GraduationCap weight="duotone" /> M.Th &bull; UBS &amp; Gurukul Scholar
                    </motion.span>
                    <motion.span
                      className="aesthetic-pill"
                      whileHover={{ y: -2, scale: 1.03 }}
                      transition={{ type: "spring", stiffness: 450, damping: 20 }}
                    >
                      <Church weight="duotone" /> 50-Yr Pastoral Heritage
                    </motion.span>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.12} className="pastor-bio-col">
              <div className="pastor-header-block">
                <div className="pastor-badge-row">
                  <span className="badge">
                    <span className="badge-dot" /> {currentPastor.role}
                  </span>
                  <span className="badge-mono">{currentPastor.since}</span>
                </div>
                <h1 className="pastor-heading">{currentPastor.name}</h1>
                <p className="pastor-subhead">
                  Faithful shepherd of Sharon Fellowship Church &bull; {currentPastor.location}
                </p>
              </div>

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
        </div>
      </section>

      <section>
        <div className="container">
          <Reveal>
            <SectionHead
              center
              eyebrow="Our History"
              title="Shepherds who have <em>led us well</em>"
              lead="From a living room in 1999 to our own building in 2004, six pastors have carried this flock."
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
              <p>&ldquo;Watch over the flock of God that is among you, shepherding them by the will of God.&rdquo;</p>
              <span>1 Peter 5:2</span>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
