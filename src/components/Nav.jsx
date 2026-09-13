import { useState, useEffect, useLayoutEffect, useRef } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon } from "@phosphor-icons/react";
import { nav, church } from "../data";
import { preloadRoute } from "../utils/preload";
import { useSiteSettings } from "../context/SiteContext";

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredPath, setHoveredPath] = useState(null);
  const [indicator, setIndicator] = useState({ left: 0, width: 0, opacity: 0, ready: false });
  const [theme, setTheme] = useState(() => localStorage.getItem("sfc-theme") || "light");
  const loc = useLocation();
  const timerRef = useRef(null);
  const linksRef = useRef({});
  const navLinksRef = useRef(null);

  const [prevPath, setPrevPath] = useState(loc.pathname);
  if (loc.pathname !== prevPath) {
    setPrevPath(loc.pathname);
    setOpen(false);
  }

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("sfc-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";

    if (timerRef.current) clearTimeout(timerRef.current);
    document.documentElement.classList.add("theme-transition");
    document.documentElement.setAttribute("data-theme", nextTheme);
    setTheme(nextTheme);

    timerRef.current = setTimeout(() => {
      document.documentElement.classList.remove("theme-transition");
      timerRef.current = null;
    }, 400);
  };

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrolled(window.scrollY > 30);
          ticking = false;
        });
        ticking = true;
      }
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  // Active route matching (handles trailing slashes and nested routes)
  const currentPath = loc.pathname.replace(/\/+$/, "") || "/";
  const activeNavItem = nav.find(
    (n) => currentPath === n.href || currentPath.startsWith(n.href + "/")
  );
  const activeHref = activeNavItem ? activeNavItem.href : null;
  const targetHref = hoveredPath || activeHref;

  // Track and update the sliding pill position
  useLayoutEffect(() => {
    const updatePill = () => {
      if (!targetHref || !navLinksRef.current) {
        setIndicator((prev) => (prev.opacity === 0 ? prev : { ...prev, opacity: 0 }));
        return;
      }

      const el = linksRef.current[targetHref];
      if (el) {
        setIndicator({
          left: el.offsetLeft,
          width: el.offsetWidth,
          opacity: 1,
          ready: true,
        });
      } else {
        setIndicator((prev) => (prev.opacity === 0 ? prev : { ...prev, opacity: 0 }));
      }
    };

    updatePill();
    const rafId = requestAnimationFrame(updatePill);
    window.addEventListener("resize", updatePill);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", updatePill);
    };
  }, [targetHref, loc.pathname]);

  const { settings } = useSiteSettings();
  const liveUrl = settings?.liveUrl || church.links.live;

  return (
    <>
      <motion.nav
        className={`nav${scrolled ? " scrolled" : ""}`}
        initial={{ y: -16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="nav-inner">
          <Link
            className="nav-brand"
            to="/"
            onMouseEnter={() => preloadRoute("/")}
            onTouchStart={() => preloadRoute("/")}
          >
            <img src={church.logo} alt="Sharon Fellowship Church" />
          </Link>

          <div
            ref={navLinksRef}
            className="nav-links"
            onMouseLeave={() => setHoveredPath(null)}
          >
            {indicator.ready && (
              <motion.span
                className={`nav-active-pill ${targetHref === activeHref ? "is-active" : "is-hover"}`}
                initial={false}
                animate={{
                  left: indicator.left,
                  width: indicator.width,
                  opacity: indicator.opacity,
                }}
                transition={{
                  type: "spring",
                  stiffness: 420,
                  damping: 32,
                  mass: 0.7,
                }}
              />
            )}

            {nav.map((n) => {
              const isCurrentActive = activeHref === n.href;
              const isTarget = targetHref === n.href;
              return (
                <NavLink
                  key={n.href}
                  ref={(el) => {
                    if (el) linksRef.current[n.href] = el;
                  }}
                  to={n.href}
                  onMouseEnter={() => {
                    setHoveredPath(n.href);
                    preloadRoute(n.href);
                  }}
                  onTouchStart={() => preloadRoute(n.href)}
                  onFocus={() => {
                    setHoveredPath(n.href);
                    preloadRoute(n.href);
                  }}
                  className={`nav-link ${isCurrentActive ? "active" : ""} ${isTarget ? "is-target" : ""}`}
                >
                  <span className="nav-link-text">{n.label}</span>
                </NavLink>
              );
            })}
          </div>

          <div className="nav-cta">
            <button
              className="theme-toggle-btn"
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
              title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
            >
              {theme === "light" ? <Moon size={18} weight="fill" /> : <Sun size={18} weight="fill" />}
            </button>
            <a className="btn btn-secondary btn-sm" href={liveUrl} target="_blank" rel="noreferrer">
              Watch Live
            </a>
            <Link className="btn btn-primary btn-sm" to="/contact" onMouseEnter={() => preloadRoute("/contact")}>
              Plan your visit
            </Link>
            <button
              className={`nav-burger${open ? " is-open" : ""}`}
              onClick={() => setOpen((v) => !v)}
              aria-label="Menu"
              aria-expanded={open}
            >
              <span /><span /><span />
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="mobile-links">
              <Link
                to="/"
                onClick={() => setOpen(false)}
                onTouchStart={() => preloadRoute("/")}
              >
                Home
              </Link>
              {nav.map((n, i) => (
                <motion.div
                  key={n.href}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.02 + i * 0.02, duration: 0.18 }}
                >
                  <Link
                    to={n.href}
                    onClick={() => setOpen(false)}
                    onTouchStart={() => preloadRoute(n.href)}
                    onMouseEnter={() => preloadRoute(n.href)}
                  >
                    {n.label}
                  </Link>
                </motion.div>
              ))}
            </div>
            <div className="mobile-actions">
              <a
                className="btn btn-secondary"
                href={liveUrl}
                target="_blank"
                rel="noreferrer"
                onClick={() => setOpen(false)}
              >
                Watch Live
              </a>
              <Link
                className="btn btn-primary"
                to="/contact"
                onClick={() => setOpen(false)}
              >
                Plan your visit
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
