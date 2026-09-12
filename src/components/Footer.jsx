import { Link } from "react-router-dom";
import { FacebookLogo, YoutubeLogo, InstagramLogo } from "@phosphor-icons/react";
import { nav, church } from "../data";
import { useSiteSettings } from "../context/SiteContext";

export default function Footer() {
  const year = new Date().getFullYear();
  const { settings } = useSiteSettings();

  const liveUrl = settings?.liveUrl || church.links.live;
  const giveUrl = settings?.giveUrl || church.links.give;
  const eventsUrl = settings?.eventsUrl || church.links.events;
  const facebookUrl = settings?.facebookUrl || church.socials.facebook;
  const youtubeUrl = settings?.youtubeUrl || church.socials.youtube;
  const instagramUrl = settings?.instagramUrl || church.socials.instagram;
  const address = settings?.address || church.address;
  const phone = settings?.phone || church.phone;
  const phoneHref = `tel:+1${phone.replace(/[^0-9]/g, "")}`;
  const email = settings?.email || church.email;

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
              {settings?.tagline || "A family of believers in Kenosha, Wisconsin. Malayalam and English worship every Sunday."}
            </p>
            <div className="footer-social">
              <a href={facebookUrl} target="_blank" rel="noreferrer" aria-label="Facebook">
                <FacebookLogo size={18} weight="fill" />
              </a>
              <a href={youtubeUrl} target="_blank" rel="noreferrer" aria-label="YouTube">
                <YoutubeLogo size={18} weight="fill" />
              </a>
              <a href={instagramUrl} target="_blank" rel="noreferrer" aria-label="Instagram">
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
            <a href={eventsUrl} target="_blank" rel="noreferrer">Events</a>
            <a href={liveUrl} target="_blank" rel="noreferrer">Watch Live</a>
            <a href={church.links.zoomPrayer} target="_blank" rel="noreferrer">Prayer Line</a>
            <a href={giveUrl} target="_blank" rel="noreferrer">Give</a>
          </div>

          <div className="footer-col">
            <h4>Visit</h4>
            <a href={church.maps} target="_blank" rel="noreferrer">{address}</a>
            <a href={phoneHref}>{phone}</a>
            <a href={`mailto:${email}`}>{email}</a>
          </div>
        </div>

        <div className="footer-bottom">
          <span className="footer-copy">&copy; {year} Sharon Fellowship Church. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}
