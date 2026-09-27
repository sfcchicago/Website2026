import PageHeader from "../components/PageHeader";
import { Reveal } from "../components/Reveal";
import { church } from "../data";
import { useSiteSettings } from "../context/SiteContext";
import { MapPin, Phone, Envelope, Headset, ArrowUpRight, FacebookLogo, YoutubeLogo, InstagramLogo, HandHeart } from "@phosphor-icons/react";

export default function Contact() {
  const { settings } = useSiteSettings();

  const address = settings?.address || church.address;
  const phone = settings?.phone || church.phone;
  const phoneHref = `tel:+1${phone.replace(/[^0-9]/g, "")}`;
  const email = settings?.email || church.email;
  const eventsUrl = settings?.eventsUrl || church.links.events;
  const giveUrl = settings?.giveUrl || church.links.give;
  const facebookUrl = settings?.facebookUrl || church.socials.facebook;
  const youtubeUrl = settings?.youtubeUrl || church.socials.youtube;
  const instagramUrl = settings?.instagramUrl || church.socials.instagram;

  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Say hello, or just show up."
        lead="Questions about services, membership, or how to get connected? We would love to hear from you."
      />

      <section>
        <div className="container">
          <div className="contact-grid">
            <div>
              <Reveal>
                <div className="contact-list">
                  <a className="contact-row" href={settings?.mapsUrl || church.maps} target="_blank" rel="noreferrer">
                    <span className="contact-icon"><MapPin size={22} weight="bold" /></span>
                    <div>
                      <h4>Visit</h4>
                      <p>{address}</p>
                    </div>
                  </a>
                  <a className="contact-row" href={phoneHref}>
                    <span className="contact-icon"><Phone size={22} weight="bold" /></span>
                    <div>
                      <h4>Call</h4>
                      <p>{phone}</p>
                    </div>
                  </a>
                  <a className="contact-row" href={`mailto:${email}`}>
                    <span className="contact-icon"><Envelope size={22} weight="bold" /></span>
                    <div>
                      <h4>Email</h4>
                      <p>{email}</p>
                    </div>
                  </a>
                  <a className="contact-row" href={settings?.zoomPrayer || church.links.zoomPrayer} target="_blank" rel="noreferrer">
                    <span className="contact-icon"><Headset size={22} weight="bold" /></span>
                    <div>
                      <h4>Prayer Line</h4>
                      <p>Tue, Thu, Sat at 7:30 PM · <span>Join on Zoom</span></p>
                    </div>
                  </a>
                </div>
              </Reveal>
            </div>

            <div>
              <Reveal delay={0.08}>
                <div className="invite-card">
                  <h3>There is a seat saved<br /><em>for you.</em></h3>
                  <p>
                    Whether you are exploring faith for the first time or looking for a church to call home, you belong here. Come as you are this Sunday.
                  </p>
                  <div className="invite-actions">
                    <a className="btn btn-secondary btn-sm" href={eventsUrl} target="_blank" rel="noreferrer">
                      Events & Announcements <ArrowUpRight size={14} weight="bold" />
                    </a>
                    <a className="btn btn-secondary btn-sm" href={giveUrl} target="_blank" rel="noreferrer">
                      <HandHeart size={14} weight="bold" /> Give via Venmo
                    </a>
                  </div>
                  <div className="social-row">
                    <a className="social-pill" href={facebookUrl} target="_blank" rel="noreferrer" aria-label="Facebook">
                      <FacebookLogo size={20} weight="fill" />
                    </a>
                    <a className="social-pill" href={youtubeUrl} target="_blank" rel="noreferrer" aria-label="YouTube">
                      <YoutubeLogo size={20} weight="fill" />
                    </a>
                    <a className="social-pill" href={instagramUrl} target="_blank" rel="noreferrer" aria-label="Instagram">
                      <InstagramLogo size={20} weight="fill" />
                    </a>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
