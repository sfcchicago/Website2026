import { Link } from "react-router-dom";
import { FacebookLogo, YoutubeLogo, InstagramLogo } from "@phosphor-icons/react";
import { nav, church } from "../data";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer>
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <Link to="/">
              <img src={church.logo} alt="Sharon Fellowship Church" />
            </Link>
            <span className="footer-version">Since 1999</span>
            <p className="footer-desc">
              A family of believers in Kenosha, Wisconsin. Malayalam and English worship every Sunday.
            </p>
            <div className="footer-social">
              <a href={church.socials.facebook} target="_blank" rel="noreferrer" aria-label="Facebook">
                <FacebookLogo size={18} weight="fill" />
              </a>
              <a href={church.socials.youtube} target="_blank" rel="noreferrer" aria-label="YouTube">
                <YoutubeLogo size={18} weight="fill" />
              </a>
              <a href={church.socials.instagram} target="_blank" rel="noreferrer" aria-label="Instagram">
                <InstagramLogo size={18} weight="fill" />
              </a>
            </div>
          </div>

          <div className="footer-col">
            <h4>Navigate</h4>
            {nav.map((n) => (
              <Link key={n.href} to={n.href}>{n.label}</Link>
            ))}
          </div>

          <div className="footer-col">
            <h4>Connect</h4>
            <a href={church.links.events} target="_blank" rel="noreferrer">Events</a>
            <a href={church.links.live} target="_blank" rel="noreferrer">Watch Live</a>
            <a href={church.links.zoomPrayer} target="_blank" rel="noreferrer">Prayer Line</a>
            <a href={church.links.give} target="_blank" rel="noreferrer">Give</a>
          </div>

          <div className="footer-col">
            <h4>Visit</h4>
            <a href={church.maps} target="_blank" rel="noreferrer">5404 67th Street</a>
            <a href={church.maps} target="_blank" rel="noreferrer">Kenosha, WI 53142</a>
            <a href={church.phoneHref}>{church.phone}</a>
            <a href={`mailto:${church.email}`}>{church.email}</a>
          </div>
        </div>

        <div className="footer-bottom">
          <span className="footer-copy">&copy; {year} Sharon Fellowship Church. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}
