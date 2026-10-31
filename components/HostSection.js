import Link from "next/link";
import { FaInstagram } from "react-icons/fa6";

import HostStack from "./HostStack";
import WhatsAppButton from "./WhatsAppButton";
import { getNight } from "../data/nights";
import { HOST } from "../data/site";
import { hostPoster } from "../lib/photos";

export default function HostSection() {
  const nights = HOST.nights.map(getNight).filter(Boolean);
  const hostName = HOST.name || "our resident host";
  const posters = nights
    .map((night) => ({ src: hostPoster(night), alt: `${night.name} poster featuring ${hostName}` }))
    .filter((poster) => poster.src);

  return (
    <section className="section host-section" aria-labelledby="host-heading">
      <div className="container split">
        {posters.length > 0 && <HostStack posters={posters} />}
        <div>
          <p className="eyebrow">Our resident host</p>
          <h2 id="host-heading">Meet Your Host</h2>
          {HOST.name && <p className="host-name">{HOST.name}</p>}
          <p className="lead">{HOST.bio || "The face of your night out, keeping the party moving every week in Kampala."}</p>
          <ul className="host-chips">
            {nights.map((night) => (
              <li key={night.slug}>
                <Link href={`/nights/${night.slug}`} className="host-chip">
                  {night.name}
                </Link>
              </li>
            ))}
          </ul>
          <div className="button-row">
            <WhatsAppButton action="book_table" item="Meet Your Host" message="Hi African Simba, I want to book a table.">
              Book a Table
            </WhatsAppButton>
            {HOST.instagram && (
              <a href={HOST.instagram} target="_blank" rel="noopener noreferrer" className="btn btn-outline">
                <FaInstagram aria-hidden="true" /> Follow on Instagram
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
