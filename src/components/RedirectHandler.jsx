import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSiteData } from "../context/SiteContext";

/**
 * RedirectHandler listens to location changes and evaluates active 301/302 redirects
 * configured in Sanity Studio. Supports internal SPA navigation and external destinations.
 */
export default function RedirectHandler() {
  const location = useLocation();
  const navigate = useNavigate();
  const { redirectRules } = useSiteData();

  useEffect(() => {
    if (!redirectRules || redirectRules.length === 0) return;

    const currentPath = location.pathname.toLowerCase().replace(/\/+$/, "") || "/";
    const currentPathWithSlash = currentPath === "/" ? "/" : `${currentPath}/`;

    const match = redirectRules.find((rule) => {
      if (!rule || rule.active === false || !rule.source) return false;
      const src = rule.source.trim().toLowerCase().replace(/\/+$/, "") || "/";
      return src === currentPath || `${src}/` === currentPathWithSlash;
    });

    if (match && match.destination) {
      const dest = match.destination.trim();
      const isExternal = /^https?:\/\//i.test(dest);

      if (isExternal) {
        window.location.replace(dest);
      } else {
        const target = dest.startsWith("/") ? dest : `/${dest}`;
        navigate(target, { replace: true });
      }
    }
  }, [location.pathname, redirectRules, navigate]);

  return null;
}
