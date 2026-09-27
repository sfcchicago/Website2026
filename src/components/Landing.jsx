import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, MapPin, Play } from "@phosphor-icons/react";
import { church, mission, services } from "../data";
import { preloadRoute, preloadImage } from "../utils/preload";
import { useSiteSettings, useSiteData } from "../context/SiteContext";
import img1 from "../assets/DSC04618.JPG";
import img2 from "../assets/DSC07464.JPG";
import img3 from "../assets/DSC08784.JPG";
import img4 from "../assets/4X8A7536.JPG";
import img5 from "../assets/4X8A7947.JPG";
import img6 from "../assets/DSC05319.JPG";
import img7 from "../assets/DSC07507.JPG";
import img8 from "../assets/IMG_9938_Original.JPG";

const HERO_IMAGES = [
  { id: "DSC04618", src: img1, posX: 53, posY: 59, scale: 1.04 },
  { id: "DSC07464", src: img2, posX: 50, posY: 64, scale: 1 },
  { id: "DSC08784", src: img3, posX: 47, posY: 57, scale: 1.06 },
  { id: "4X8A7536", src: img4, posX: 50, posY: 61, scale: 1 },
  { id: "4X8A7947", src: img5, posX: 49, posY: 36, scale: 1.06 },
  { id: "DSC05319", src: img6, posX: 50, posY: 40, scale: 1.06 },
  { id: "DSC07507", src: img7, posX: 54, posY: 60, scale: 1 },
  { id: "IMG_9938", src: img8, posX: 59, posY: 63, scale: 1 },
];

const ease = [0.22, 1, 0.36, 1];
const week = services;
const directory = [
  { to: "/new-here", n: "01", label: "I'm New Here", desc: "What Sunday feels like, from the parking lot to the last song." },
  { to: "/pastor", n: "02", label: "Our Pastor", desc: "Rev. M. G. Johnson — shepherd of this house." },
  { to: "/leadership", n: "03", label: "Leadership", desc: "The board and coordinators who keep the church moving." },
  { to: "/beliefs", n: "04", label: "What We Believe", desc: "Anchored in the 66 books. Centered on Jesus." },
  { to: "/sunday-school", n: "05", label: "Sunday School", desc: "Toddlers through senior high, every week at 10." },
  { to: "/contact", n: "06", label: "Visit / Contact", desc: "Address, prayer line, and a seat with your name on it." },
];
const faq = [
  { q: "What should I wear?", a: "Whatever makes you comfortable. You'll see everything from jeans and sneakers to dress shirts. There is no dress code — just come as you are." },
  { q: "Is there childcare or Sunday School?", a: "Yes! We have age-based Sunday School classes every Sunday from 10:00–10:55 AM, running concurrently between the two services. Classes cover toddlers through senior high." },
  { q: "What language are the services in?", a: "We worship in both Malayalam and English. The Malayalam service runs 9:30–11:00 AM and the English service runs 11:00 AM–12:30 PM. Both are open to everyone." },
  { q: "Where do I park?", a: "We have a parking lot right next to our building at 5404 67th Street, Kenosha. There is plenty of space and someone will be happy to point you toward the entrance." },
  { q: "Can I watch online?", a: "Absolutely. We stream every service live on YouTube. Click 'Watch Live' in the navigation or visit our YouTube channel any Sunday morning." },
  { q: "How can I get connected mid-week?", a: "We have a prayer line every Tuesday, Thursday, and Saturday at 7:30 PM via Zoom, and young adults (RISE) meet the 4th Saturday at 7:00 PM. Check the Contact page for links." },
];

function Fade({ children, className = "", delay = 0, y = 14 }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.05 }}
      transition={{ duration: 0.28, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

const DEFAULT_CYCLE_WORDS = [
  "Belong",
  "Matter",
  "Are Seen",
  "Are Home",
  "Are Loved",
];

function CyclingWord({ words, reduce }) {
  const activeWords = words && words.length > 0 ? words : DEFAULT_CYCLE_WORDS;
  const [index, setIndex] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const boot = setTimeout(() => setStarted(true), 1200);
    return () => clearTimeout(boot);
  }, []);

  useEffect(() => {
    if (!started) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % activeWords.length);
    }, 2800);
    return () => clearInterval(id);
  }, [started, activeWords.length]);

  const currentWord = activeWords[index % activeWords.length] || activeWords[0];

  if (reduce) {
    return (
      <span className="cycle-word-item">
        <span className="cycle-word-text">{currentWord}</span>
        <span className="cycle-word-glow" aria-hidden="true">{currentWord}</span>
      </span>
    );
  }

  return (
    <span className="cycle-wrap" aria-live="polite" aria-atomic="true">
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={currentWord}
          className="cycle-word-item"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{
            opacity: { duration: 0.22, ease: [0.16, 1, 0.3, 1] },
            y: { duration: 0.25, ease: [0.16, 1, 0.3, 1] },
          }}
        >
          <span className="cycle-word-text">{currentWord}</span>
          <span className="cycle-word-glow" aria-hidden="true">{currentWord}</span>
          <span className="cycle-word-glow-wide" aria-hidden="true">{currentWord}</span>
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

let persistentHeroIndex = 0;

function Hero({ previewSettings }) {
  const reduce = useReducedMotion();
  const { settings: ctxSettings } = useSiteSettings();
  const { homeContent, services: allServices } = useSiteData();
  const settings = previewSettings || ctxSettings;
  const liveUrl = settings?.liveUrl || church.links.live;
  const [currentIndex, setCurrentIndex] = useState(persistentHeroIndex);
  const [prevIndex, setPrevIndex] = useState(null);

  const sundayServices = (allServices && allServices.length > 0 ? allServices : services).filter((s) => s.day === "Sunday");

  useEffect(() => {
    persistentHeroIndex = currentIndex;
    const nextIdx = (currentIndex + 1) % HERO_IMAGES.length;
    preloadImage(HERO_IMAGES[nextIdx].src);

    const timer = setInterval(() => {
      setPrevIndex(currentIndex);
      setCurrentIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 6500);
    return () => clearInterval(timer);
  }, [currentIndex]);

  const heroRef = useRef(null);
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  // Smooth fade out of photo background on initial scroll without heavy scale invalidation
  const heroBgOpacity = useTransform(heroScroll, [0, 0.5], [1, 0]);
  const heroContentOpacity = useTransform(heroScroll, [0, 0.4], [1, 0]);
  const heroContentY = useTransform(heroScroll, [0, 0.4], [0, -24]);

  // Dynamic bottom darkness fade that ramps up on scroll to seamlessly blend into the canvas
  const heroBottomDarkness = useTransform(heroScroll, [0, 0.35], [0, 1]);

  const currentPhoto = HERO_IMAGES[currentIndex];
  const prevPhoto = prevIndex !== null ? HERO_IMAGES[prevIndex] : null;

  return (
    <section className="hero-section" ref={heroRef}>
      <motion.div
        className="hero-bg"
        aria-hidden="true"
        style={reduce ? {} : { opacity: heroBgOpacity }}
      >
        {prevPhoto && (
          <img
            key={`prev-${prevIndex}`}
            src={prevPhoto.src}
            alt=""
            loading="eager"
            decoding="async"
            className="hero-bg-layer hero-bg-base"
            style={{
              transform: `translate3d(-50%, -50%, 0) translate3d(${prevPhoto.posX - 50}%, ${prevPhoto.posY - 50}%, 0) scale(${prevPhoto.scale})`,
            }}
          />
        )}
        <motion.img
          key={`curr-${currentIndex}`}
          src={currentPhoto.src}
          alt=""
          loading="eager"
          decoding="async"
          className="hero-bg-layer hero-bg-active"
          style={{
            transform: `translate3d(-50%, -50%, 0) translate3d(${currentPhoto.posX - 50}%, ${currentPhoto.posY - 50}%, 0) scale(${currentPhoto.scale})`,
          }}
          initial={{ opacity: prevIndex === null ? 1 : 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
        />
        <div className="hero-bg-overlay" />
        <motion.div
          className="hero-scroll-darkness"
          style={reduce ? {} : { opacity: heroBottomDarkness }}
        />
      </motion.div>
      <div className="hero-glow" aria-hidden="true" />
      <motion.div
        className="container"
        style={reduce ? {} : { opacity: heroContentOpacity, y: heroContentY }}
      >
        <motion.p
          className="badge hero-badge"
          initial={reduce ? false : { opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.22, ease }}
        >
          <span className="badge-dot" />
          <span className="hero-badge-sub">{homeContent?.heroBadge || "Kenosha, WI · Since 1999"}</span>
        </motion.p>

        <h1 className="hero-title">
          <motion.span
            className="hero-title-line"
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.04, duration: 0.28, ease }}
          >
            <CyclingWord words={homeContent?.cycleWords} reduce={reduce} />
          </motion.span>
          <motion.span
            className="hero-title-line"
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08, duration: 0.28, ease }}
          >
            {homeContent?.heroTitleSuffix || "here"}
          </motion.span>
        </h1>

        <motion.p
          className="hero-sub"
          initial={reduce ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12, duration: 0.25, ease }}
        >
          {homeContent?.heroSubtitle || "Malayalam and English worship every Sunday. Come as you are. There is a place at the table."}
        </motion.p>

        <motion.div
          className="hero-actions"
          initial={reduce ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.16, duration: 0.25, ease }}
        >
          <Link className="btn btn-primary" to="/new-here">
            {homeContent?.heroCtaPrimaryText || "Plan your visit"}
            <span className="btn-ico"><ArrowRight size={14} weight="bold" /></span>
          </Link>
          <a className="btn btn-secondary" href={liveUrl} target="_blank" rel="noreferrer">
            <Play size={14} weight="fill" /> {homeContent?.heroCtaSecondaryText || "Watch live"}
          </a>
        </motion.div>

        <motion.p
          className="hero-trust"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.2 }}
        >
          {homeContent?.heroTrust || "Every Sunday · Malayalam 9:30 AM · English 11 AM · All welcome"}
        </motion.p>

        <motion.div
          className="hero-chips"
          initial={reduce ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.24, duration: 0.28, ease }}
        >
          {sundayServices.slice(0, 3).map((s) => (
            <GlassChip key={s.name}>
              <span className="hero-chip-time">{s.time}</span>
              <span className="hero-chip-name">{s.name}</span>
            </GlassChip>
          ))}
          <GlassChip as="a" href={settings?.mapsUrl || church.maps} target="_blank" rel="noreferrer" className="hero-chip-map">
            <span className="hero-chip-time hero-chip-loc-header">
              <MapPin size={13} weight="bold" />
              <span>Location</span>
            </span>
            <span className="hero-chip-name">{settings?.address?.split(",")[0] || "5404 67th St"}</span>
          </GlassChip>
        </motion.div>
      </motion.div>
    </section>
  );
}

function GlassChip({ children, as = "div", href, target, rel, className = "" }) {
  const reduce = useReducedMotion();
  const [mousePos, setMousePos] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = (e) => {
    if (reduce) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y, opacity: 1 });
  };

  const handleMouseLeave = () => {
    setMousePos((prev) => ({ ...prev, opacity: 0 }));
  };

  const Component = as === "a" ? motion.a : motion.div;

  return (
    <Component
      className={`hero-chip ${className}`}
      href={href}
      target={target}
      rel={rel}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={reduce ? {} : { y: -4, scale: 1.03 }}
      whileTap={reduce ? {} : { scale: 0.96 }}
      transition={{ type: "spring", stiffness: 450, damping: 25 }}
    >
      <div
        className="hero-chip-spotlight"
        style={{
          opacity: mousePos.opacity,
          background: `radial-gradient(100px circle at ${mousePos.x}% ${mousePos.y}%, rgba(255, 255, 255, 0.35), transparent 70%)`,
        }}
      />
      {children}
    </Component>
  );
}

function Verse({ previewSettings }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { settings: ctxSettings } = useSiteSettings();
  const settings = previewSettings || ctxSettings;
  const verseText = settings?.verseText || church.verse.text;
  const verseRef = settings?.verseRef || church.verse.ref;
  const verseMl = settings?.verseMl || church.verse.ml;
  const verseMlRef = settings?.verseMlRef || church.verse.mlRef;
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "center 0.35"],
  });

  const line = useTransform(scrollYProgress, [0.1, 0.95], [0, 1]);
  const en = verseText.split(" ");
  const ml = verseMl.split(" ");

  return (
    <section className="verse-section" ref={ref}>
      <div className="container">
        <div className="verse-refs">
          <p className="verse-ref">{verseRef}</p>
          <p className="verse-ref" lang="ml">{verseMlRef}</p>
        </div>
        <div className="verse-grid">
          <p className="verse-text">
            {en.map((w, i) => (
              <VerseWord
                key={`en-${i}`}
                i={i}
                total={en.length}
                progress={scrollYProgress}
                reduce={reduce}
                from={0}
                span={0.55}
              >
                {w}
              </VerseWord>
            ))}
          </p>
          <p className="verse-text verse-ml" lang="ml">
            {ml.map((w, i) => (
              <VerseWord
                key={`ml-${i}`}
                i={i}
                total={ml.length}
                progress={scrollYProgress}
                reduce={reduce}
                from={0.3}
                span={0.65}
              >
                {w}
              </VerseWord>
            ))}
          </p>
        </div>
        <div className="verse-rule-track" aria-hidden="true">
          <motion.span
            className="verse-rule-fill"
            style={reduce ? { scaleX: 1 } : { scaleX: line }}
          />
        </div>
      </div>
    </section>
  );
}

function VerseWord({ i, total, progress, reduce, from = 0, span = 1, children }) {
  const start = from + (i / total) * span;
  const end = Math.min(1, from + ((i + 0.85) / total) * span);
  const opacity = useTransform(progress, [start, end], [0.15, 1]);
  const y = useTransform(progress, [start, end], [8, 0]);
  if (reduce) return <span className="verse-word">{children} </span>;
  return (
    <motion.span className="verse-word" style={{ opacity, y }}>
      {children}{" "}
    </motion.span>
  );
}

function Story() {
  const { about, homeContent } = useSiteData();
  const statsList = homeContent?.stats?.length ? homeContent.stats : [
    { number: "1999", label: "First gathering" },
    { number: "100+", label: "Members & growing" },
    { number: "22+", label: "Years in Kenosha" },
    { number: "2", label: "Languages each Sunday" },
  ];

  return (
    <section>
      <div className="container">
        <Fade>
          <div className="section-head center">
            <span className="badge"><span className="badge-dot" /> {homeContent?.storyBadge || "Our story"}</span>
            <h2 className="section-title">{homeContent?.storyTitle || <>Devoted to God,<br /><em>and to one another.</em></>}</h2>
            <p className="section-subtitle">{homeContent?.storySubtitle || about?.mission || mission.mission}</p>
          </div>
        </Fade>

        <Fade delay={0.1}>
          <div className="stats-row">
            {statsList.map((stat, i) => (
              <div className="stat-card" key={i}>
                <strong className="stat-num">{stat.number}</strong>
                <span className="stat-label">{stat.label}</span>
              </div>
            ))}
          </div>
        </Fade>
      </div>
    </section>
  );
}

function Week() {
  const { services: liveServices, homeContent } = useSiteData();
  const weekList = liveServices || week;

  return (
    <section>
      <div className="container">
        <Fade>
          <div className="section-head center">
            <span className="badge"><span className="badge-dot" /> {homeContent?.servicesBadge || "Your Sunday"}</span>
            <h2 className="section-title">{homeContent?.servicesTitle || "Where we gather every Sunday."}</h2>
            <p className="section-subtitle">{homeContent?.servicesSubtitle || "Every week we gather to worship, learn, pray, and grow. Here is what a typical week looks like."}</p>
          </div>
        </Fade>

        <Fade delay={0.08}>
          <div className="steps-list">
            {weekList.map((s, i) => (
              <article className="step-row" key={s.name}>
                <span className="step-n">{String(i + 1).padStart(2, "0")}</span>
                <div className="step-body">
                  <h3>{s.name}</h3>
                  <p>{s.note}</p>
                </div>
                <span className="step-time">{s.day} · {s.time}</span>
              </article>
            ))}
          </div>
        </Fade>
      </div>
    </section>
  );
}

function Directory() {
  const { homeContent } = useSiteData();
  const dirList = homeContent?.directory?.length ? homeContent.directory : directory;

  return (
    <section>
      <div className="container">
        <Fade>
          <div className="section-head center">
            <span className="badge"><span className="badge-dot" /> {homeContent?.directoryBadge || "Start here"}</span>
            <h2 className="section-title">{homeContent?.directoryTitle || "Find your next step."}</h2>
            <p className="section-subtitle">{homeContent?.directorySubtitle || "Whether you're visiting for the first time or looking to get more involved, here's where to go."}</p>
          </div>
        </Fade>

        <div className="dir-list">
          {dirList.map((item, i) => (
            <Fade key={item.to} delay={0.03 * i}>
              <Link
                className="dir-row"
                to={item.to}
                onMouseEnter={() => preloadRoute(item.to)}
                onTouchStart={() => preloadRoute(item.to)}
                onFocus={() => preloadRoute(item.to)}
              >
                <span className="dir-n">{item.n}</span>
                <span className="dir-copy">
                  <strong>{item.label}</strong>
                  <em>{item.desc}</em>
                </span>
                <span className="dir-go">
                  <ArrowRight size={18} weight="bold" />
                </span>
              </Link>
            </Fade>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const { homeContent } = useSiteData();
  const faqList = homeContent?.faqs?.length ? homeContent.faqs : faq;
  const [openIndex, setOpenIndex] = useState(-1);

  return (
    <section>
      <div className="container">
        <Fade>
          <div className="section-head center">
            <span className="badge"><span className="badge-dot" /> {homeContent?.faqBadge || "FAQ"}</span>
            <h2 className="section-title">{homeContent?.faqTitle || "Questions? Here are the answers."}</h2>
            <p className="section-subtitle">{homeContent?.faqSubtitle || "Everything you need to know before visiting Sharon Fellowship Church for the first time."}</p>
          </div>
        </Fade>

        <Fade delay={0.08}>
          <div className="faq-list">
            {faqList.map((item, i) => (
              <div key={i} className={`faq-item${openIndex === i ? " is-open" : ""}`}>
                <button className="faq-q" onClick={() => setOpenIndex(openIndex === i ? -1 : i)}>
                  <span>{item.q}</span>
                  <span className="faq-icon">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <rect x="6" y="0" width="2" height="14" rx="1" fill="currentColor" />
                      <rect x="0" y="6" width="14" height="2" rx="1" fill="currentColor" />
                    </svg>
                  </span>
                </button>
                <div className="faq-a">
                  <div>
                    <p>{item.a}</p>
                  </div>
                </div>
              </div>
            ))}

            <div className="faq-more">
              <div className="faq-more-copy">
                <h3>{homeContent?.faqMoreTitle || "Got more questions?"}</h3>
                <p>{homeContent?.faqMoreText || "Reach out anytime — we'd love to hear from you."}</p>
              </div>
              <Link className="btn btn-secondary" to="/contact">
                Contact us <ArrowRight size={14} weight="bold" />
              </Link>
            </div>
          </div>
        </Fade>
      </div>
    </section>
  );
}

function CTA() {
  const { homeContent, settings } = useSiteData();

  return (
    <section className="cta-section">
      <div className="container">
        <Fade>
          <div className="cta-inner">
            <span className="badge"><span className="badge-dot" /> {homeContent?.ctaBadge || "Get started"}</span>
            <h2>{homeContent?.ctaTitle || <>A seat is saved<br /><em>for you.</em></>}</h2>
            <p>{homeContent?.ctaSubtitle || "Join us this Sunday at 9:30 and 11 AM. All are welcome."}</p>
            <div className="cta-actions">
              <Link className="btn btn-primary" to="/contact">
                Visit us
                <span className="btn-ico"><ArrowRight size={14} weight="bold" /></span>
              </Link>
              <a className="btn btn-secondary" href={settings?.mapsUrl || church.maps} target="_blank" rel="noreferrer">
                <MapPin size={14} weight="bold" /> Directions
              </a>
            </div>
            <p className="cta-trust">{homeContent?.ctaTrust || "Every Sunday · Malayalam & English · All are welcome"}</p>
          </div>
        </Fade>
      </div>
    </section>
  );
}

export default function Landing({ previewSettings }) {
  return (
    <div className="landing-page">
      <Hero previewSettings={previewSettings} />
      <Verse previewSettings={previewSettings} />
      <Story />
      <Week />
      <Directory />
      <FAQ />
      <CTA />
    </div>
  );
}
