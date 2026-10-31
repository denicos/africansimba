import Image from "next/image";
import Link from "next/link";
import { FaInstagram, FaSnapchat, FaTiktok, FaWhatsapp, FaXTwitter } from "react-icons/fa6";
import { MARTELL_LOGO, SITE, SOCIALS } from "../data/site";

const SOCIAL_LINKS = [
  { href: SOCIALS.instagram, label: "Instagram", Icon: FaInstagram },
  { href: SOCIALS.tiktok, label: "TikTok", Icon: FaTiktok },
  { href: SOCIALS.snapchat, label: "Snapchat", Icon: FaSnapchat },
  { href: SOCIALS.x, label: "X", Icon: FaXTwitter },
  { href: SOCIALS.whatsappChannel, label: "WhatsApp channel", Icon: FaWhatsapp },
].filter((link) => link.href);

export default function Footer() {
  const { address } = SITE;

  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <Image src="/logos/simba_white.webp" alt="African Simba Events logo" width={84} height={70} loading="lazy" />
          <div className="footer-martell">
            <Image
              src={MARTELL_LOGO.src}
              alt={MARTELL_LOGO.alt}
              width={MARTELL_LOGO.width}
              height={MARTELL_LOGO.height}
              sizes="96px"
              quality={90}
              className="footer-martell-logo"
            />
            <p>Official Martell Brand Ambassador – Uganda</p>
          </div>
        </div>

        <div>
          <h2 className="footer-heading">Contact</h2>
          <ul className="footer-list">
            <li>
              <a href={`tel:${SITE.phoneE164}`}>{SITE.phoneDisplay}</a>
            </li>
            <li>
              <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
            </li>
            <li>
              {SITE.legalName}
              <br />
              {address.area}, {address.division}, {address.city}, {address.country}
            </li>
          </ul>
        </div>

        <div>
          <h2 className="footer-heading">More</h2>
          <ul className="footer-list">
            <li>
              <Link href="/about">About Us</Link>
            </li>
            <li>
              <Link href="/past-events">Past Events</Link>
            </li>
            <li>
              <Link href="/privacy-policy">Privacy Policy</Link>
            </li>
            <li>
              <Link href="/terms">Terms of Service</Link>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="footer-heading">Follow us</h2>
          <ul className="footer-socials">
            {SOCIAL_LINKS.map(({ href, label, Icon }) => (
              <li key={label}>
                <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>
                  <Icon aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="container footer-bottom">
        <p className="footer-responsibly">Enjoy responsibly. Not for sale to persons under 18.</p>
        <p>
          &copy; {new Date().getFullYear()} {SITE.legalName}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
