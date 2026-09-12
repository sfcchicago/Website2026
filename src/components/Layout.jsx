import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import Lenis from "lenis";
import Nav from "./Nav";
import Footer from "./Footer";
import Scene from "./Scene";
import { preloadRoute } from "../utils/preload";

export default function Layout() {
  const { pathname } = useLocation();

  useEffect(() => {
    preloadRoute(pathname);
  }, [pathname]);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
      infinite: false,
    });
    window.lenis = lenis;

    let rfId;
    function raf(time) {
      lenis.raf(time);
      rfId = requestAnimationFrame(raf);
    }
    rfId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rfId);
      window.lenis = null;
      lenis.destroy();
    };
  }, []);

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <Scene />
      <Nav />
      <motion.main
        id="main"
        className={`main-shell ${pathname === "/" ? "main-home" : "main-subpage"}`}
        tabIndex={-1}
        key={pathname}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
      >
        <Outlet />
      </motion.main>
      <Footer />
    </>
  );
}
