import Image from "next/image";
import Link from "next/link";
import { MARTELL_LOGO, PARTNERS } from "../data/site";

function PartnerCard({ partner }) {
  const content = (
    <>
      <span className="partner-logo">
        {partner.logo ? (
          <Image
            src={partner.logo}
            alt={`${partner.name} logo`}
            width={partner.logoWidth}
            height={partner.logoHeight}
            sizes="160px"
            loading="lazy"
            className={partner.logoOnBlack ? "logo-on-black" : undefined}
          />
        ) : (
          <span className="partner-wordmark">{partner.name}</span>
        )}
      </span>
      <span className="partner-label">{partner.label}</span>
    </>
  );

  return partner.href ? (
    <Link href={partner.href} className="partner-card">
      {content}
    </Link>
  ) : (
    <div className="partner-card">{content}</div>
  );
}

export default function PartnersSection() {
  return (
    <section className="section" aria-labelledby="partners-heading">
      <div className="container">
        <p className="eyebrow">Who we work with</p>
        <h2 id="partners-heading">Our partners in Kampala</h2>

        <div className="partner-martell">
          <Image
            src={MARTELL_LOGO.src}
            alt={MARTELL_LOGO.alt}
            width={MARTELL_LOGO.width}
            height={MARTELL_LOGO.height}
            sizes="272px"
            quality={90}
            loading="lazy"
            className="martell-logo"
          />
          <div>
            <p className="partner-martell-title">Official Brand Ambassador in Uganda</p>
            <p>African Simba Events proudly brings Martell to every one of our nights.</p>
          </div>
        </div>

        <div className="partner-grid">
          {PARTNERS.map((partner) => (
            <PartnerCard key={partner.name} partner={partner} />
          ))}
        </div>
      </div>
    </section>
  );
}
