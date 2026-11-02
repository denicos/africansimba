import { FaFacebook, FaInstagram, FaSnapchat, FaTiktok, FaWhatsapp, FaXTwitter, FaYoutube } from "react-icons/fa6";
import { FiMail, FiMapPin, FiPhone } from "react-icons/fi";

import PageHeader from "../../components/PageHeader";
import WhatsAppButton from "../../components/WhatsAppButton";
import { SITE, SOCIALS } from "../../data/site";
import { pageMetadata } from "../../lib/metadata";

export const metadata = pageMetadata({
  title: "Contact African Simba Events in Kampala",
  description:
    "Contact African Simba Events in Kansanga, Kampala. WhatsApp +256 748 634 813 to book a table, order drinks or ask about our weekly nights.",
  path: "/contact-us",
});

const SOCIAL_LINKS = [
  { href: SOCIALS.instagram, label: "Instagram", Icon: FaInstagram },
  { href: SOCIALS.tiktok, label: "TikTok", Icon: FaTiktok },
  { href: SOCIALS.snapchat, label: "Snapchat", Icon: FaSnapchat },
  { href: SOCIALS.x, label: "X", Icon: FaXTwitter },
  { href: SOCIALS.whatsappChannel, label: "WhatsApp channel", Icon: FaWhatsapp },
  { href: SOCIALS.facebook, label: "Facebook", Icon: FaFacebook },
  { href: SOCIALS.youtube, label: "YouTube", Icon: FaYoutube },
].filter((link) => link.href);

export default function ContactPage() {
  const { address } = SITE;

  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Contact African Simba Events in Kampala"
        lead="The fastest way to reach us is WhatsApp. Book a table, order a bottle or just ask."
      >
        <div className="button-row">
          <WhatsAppButton action="general_enquiry" item="Contact page" message="Hi African Simba, I have a question.">
            Chat on WhatsApp
          </WhatsAppButton>
        </div>
      </PageHeader>

      <section className="section section-tight">
        <div className="container contact-grid">
          <div className="card">
            <h2>Reach us</h2>
            <ul className="night-details night-details-stacked">
              <li>
                <FiPhone aria-hidden="true" />
                <a href={`tel:${SITE.phoneE164}`}>{SITE.phoneDisplay}</a>
              </li>
              <li>
                <FiMail aria-hidden="true" />
                <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
              </li>
              <li>
                <FiMapPin aria-hidden="true" />
                <span>
                  {SITE.legalName}, {address.area}, {address.division}, {address.city}, {address.country}
                </span>
              </li>
            </ul>
          </div>
          <div className="card">
            <h2>Follow us</h2>
            <ul className="contact-socials">
              {SOCIAL_LINKS.map(({ href, label, Icon }) => (
                <li key={label}>
                  <a href={href} target="_blank" rel="noopener noreferrer">
                    <Icon aria-hidden="true" /> {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
