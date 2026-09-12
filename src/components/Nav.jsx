import { useState, useEffect, useRef } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon } from "@phosphor-icons/react";
import { nav, church } from "../data";
import { preloadRoute } from "../utils/preload";

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState(() => localStorage.getItem("sfc-theme") || "light");
  const loc = useLocation();
  const [prevPath, setPrevPath] = useState(loc.pathname);
  const timerRef = useRef(null);

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
    const fn = () => setScrolled(window.scrollY > 40);
    fn(); window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <nav className={`nav${scrolled ? " scrolled" : ""}`}>
        <div className="nav-inner">
          <Link
            className="nav-brand"
            to="/"
            onMouseEnter={() => preloadRoute("/")}
            onTouchStart={() => preloadRoute("/")}
          >
            <img src={church.logo} alt="Sharon Fellowship Church" />
          </Link>

          <div className="nav-links">
            {nav.map((n) => (
              <NavLink
                key={n.href}
                to={n.href}
                onMouseEnter={() => preloadRoute(n.href)}
                onTouchStart={() => preloadRoute(n.href)}
                onFocus={() => preloadRoute(n.href)}
                className={({ isActive }) => isActive ? "active" : ""}
              >
                {({ isActive }) => (
                  <>
                    <span>{n.label}</span>
                    {isActive && (
                      <motion.span
                        className="nav-active-pill"
                        layoutId="activeNavPill"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
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
            <a className="btn btn-secondary btn-sm" href={church.links.live} target="_blank" rel="noreferrer">
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
      </nav>

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
              <Link to="/" onTouchStart={() => preloadRoute("/")}>Home</Link>
              {nav.map((n, i) => (
                <motion.div
                  key={n.href}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 + i * 0.04 }}
                >
                  <Link to={n.href} onTouchStart={() => preloadRoute(n.href)}>{n.label}</Link>
                </motion.div>
              ))}
            </div>
            <div className="mobile-actions">
              <a className="btn btn-secondary" href={church.links.live} target="_blank" rel="noreferrer">
                Watch Live
              </a>
              <Link className="btn btn-primary" to="/contact">
                Plan your visit
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
