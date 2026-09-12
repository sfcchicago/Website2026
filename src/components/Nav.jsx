import { useState, useEffect, useRef } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { Sun, Moon } from "@phosphor-icons/react";
import { nav, church } from "../data";
import { preloadRoute } from "../utils/preload";
import { useSiteSettings } from "../context/SiteContext";

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredPath, setHoveredPath] = useState(null);
  const [theme, setTheme] = useState(() => localStorage.getItem("sfc-theme") || "light");
  const loc = useLocation();
  const timerRef = useRef(null);

  // Close mobile menu on route change
  useEffect(() => {
    setOpen(false);
  }, [loc.pathname]);

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

  const { settings } = useSiteSettings();
  const liveUrl = settings?.liveUrl || church.links.live;

  return (
    <>
      <motion.nav
        className={`nav${scrolled ? " scrolled" : ""}`}
        initial={{ y: -16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
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

          <LayoutGroup id="nav-pill">
            <div className="nav-links" onMouseLeave={() => setHoveredPath(null)}>
              {nav.map((n) => {
                const isActive = loc.pathname === n.href;
                const isHovered = hoveredPath === n.href;
                return (
                  <NavLink
                    key={n.href}
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
                    className={({ isActive: a }) => a ? "active" : ""}
                  >
                    <span>{n.label}</span>
                    {isActive && (
                      <motion.span
                        className="nav-active-pill"
                        layoutId="activeNavPill"
                        transition={{ type: "spring", stiffness: 420, damping: 32 }}
                      />
                    )}
                    {isHovered && !isActive && (
                      <motion.span
                        className="nav-hover-pill"
                        layoutId="hoverNavPill"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ type: "spring", stiffness: 450, damping: 35 }}
                      />
                    )}
                  </NavLink>
                );
              })}
            </div>
          </LayoutGroup>

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
            <Link className="btn btn-primary btn-sm" to="/contact">
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
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
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
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 + i * 0.04 }}
                >
                  <Link
                    to={n.href}
                    onClick={() => setOpen(false)}
                    onTouchStart={() => preloadRoute(n.href)}
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
